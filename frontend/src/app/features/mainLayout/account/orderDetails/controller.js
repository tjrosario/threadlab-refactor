import cloneDeep from 'lodash/cloneDeep';
import filter from 'lodash/filter';
import first from 'lodash/first';
import find from 'lodash/find';
import each from 'lodash/each';
import unionBy from 'lodash/unionBy';

/* @ngInject */
export default class AccountOrderDetails {
    constructor(order, customer, orderService, customerService, notificationsService, stripeService, userModel, CONFIG, $window, $scope, facebookService, authService) {
    	this.order = order[0].data.data;
        this.customer = customer[0].data.data;
        this.customerService = customerService;
        this.notificationsService = notificationsService;
        this.stripeService = stripeService;
        this.userModel = userModel;
        this.appConfig = CONFIG;
        this.$window = $window;
        this.$scope = $scope;
        this.facebookService = facebookService;
        this.authService = authService;
        this.orderService = orderService;
    }

    $onInit() {
        this.currentUser = this.userModel.loggedUser;
        this.paymentMethodMode = 'add';
        this.order.paymentMethod = this.order.paymentMethod || 'stripe';
        this.selectedCardData = {};
        this.alerts = [];
        this.getAddresses();
        this.getCards();
        this.setupPaypalFields();

        this.setNumRejectedOrderItems(this.getRejectedOrderItems(this.order).length);
        this.setNumReturnedOrderItems(this.getReturnedOrderItems(this.order).length);

        this.$scope.$on('orderPricingUpdated', (event, args) => {
            this.setNumRejectedOrderItems(this.getNumRejectedOrderItems());
            this.setNumReturnedOrderItems(this.getNumReturnedOrderItems());
        });

        this.requiredCreditCardFields = [{
            field: "name",
            name: "Name on Card"
        }, {
            field: "number",
            name: "Card Number"
        }, {
            field: "cvc",
            name: "Card CVC"
        }, {
            field: "expiry",
            name: "Expiration Date"
        }, {
            field: "address_zip",
            name: "Card Zip Code"
        }];

        this.requiredAddressFields = [{
            field: "addressLine1",
            name: "Street"
        }, {
            field: "city",
            name: "City"
        }, {
            field: "state",
            name: "State"
        }, {
            field: "zip",
            name: "Zip Code"
        }, {
            field: 'addresseePhone',
            name: "Shipping Address Phone Number"
        }];
    }

    getAddresses() {
        const addresses = this.customer.addresses;
        const shippingAddresses = filter(addresses, address => {
            return address.type === 'shipping';
        });

        if (shippingAddresses.length > 0) {
            this.addresses = shippingAddresses;
            
            const selected = first(filter(this.addresses, address => {
                return address.isDefault;
            }));

            this.selectAddress(selected.id);
        }
    }

    selectAddress(address) {
        this.selectedAddress = address;
        this.selectedAddressData = find(this.addresses, { id: this.selectedAddress }) || {};
        this.selectedAddressData.type = 'shipping';
    }

    getCards() {
        const id = this.currentUser.paymentCustomerId;

        if (id) {
            this.stripeService.getCustomer({ id }).then((res) => {
                const data = res.data;
                
                if (data.error) {
                    const msg = data.error.message;
                    this.notificationsService.alert({msg});

                    if (msg.indexOf('similar object exists in live mode') > -1) {
                        this.clearPaymentId();
                    }
                } else {
                    this.cards = data.sources.data;
                    this.selectCard(first(this.cards).id);
                }
            }, err => {
                this.notificationsService.alert({msg: err.message});
            });
        }
    }

    clearPaymentId() {
        const config = {
            params: {
                paymentCustomerId: ''
            }
        };

        this.customerService.updateEntity({ config })
            .then(resp => {
                if (resp.data.success) {
                    this.authService.setCurrentUser(resp.data.data);
                }
            });
    }

    selectCard(card) {
        this.selectedCard = card;
        this.selectedCardData = find(this.cards, { id: this.selectedCard }) || {};
    }

    getOrderAmount() {
        return this.order.invoiceValue;
    }

    getOrderTitle() {
        const order = this.order;

        return `Order-${order.orderNumber}`;
    }

    getConfirmReturnPath() {
        const order = this.order;
        const $window = this.$window;

        return `${$window.location.origin}/account/order/${order.orderNumber}/complete`;
    }

    getCancelReturnPath() {
        const order = this.order;
        const $window = this.$window;

        return `${$window.location.origin}/account/order/${order.orderNumber}/checkout?cancel_return=true`;
    }

    setupPaypalFields() {
        const paypalConfig = this.appConfig.paypal;

        this.paypal = {
            formAction: paypalConfig.checkout.action,
            hostedButtonId: paypalConfig.checkout.hosted_button_id,
            business: paypalConfig.checkout.business,
            amount: this.getOrderAmount(),
            quantity: '1',
            itemName: this.getOrderTitle(),
            return: this.getConfirmReturnPath(),
            cancelReturn: this.getCancelReturnPath(),
            paymentAction: 'sale',
            custom: this.currentUser.email
        };
    }

    setNumRejectedOrderItems(num) {
        this.numRejects = num;
        this.allRejected = this.numRejects === this.order.orderItems.length;
    }

    setNumReturnedOrderItems(num) {
        this.numReturns = num;
    }

    getNumRejectedOrderItems() {
        return $('.order-item.reject').length;
    }

    getNumReturnedOrderItems() {
        return $('.order-item.return').length;
    }

    getNumAllOrderItems() {
        return $('.order-item:not(.inactive, .empty, .not-added)').length;
    }

    getRejectedOrderItems(order) {
        const rejected = filter(order.orderItems, { rejected: true });

        return rejected;
    }

    getReturnedOrderItems(order) {
        const returned = filter(order.orderItems, { returned: true });

        return returned;
    }

    getMarkedForReturnOrderItems(order) {
        const markedForReturn = filter(order.orderItems, { markedForReturn: true });

        return markedForReturn;
    }

    setPaymentMethod(method) {
        this.order.paymentMethod = method;
    }

    validateForm(form, fields) {
        let numErrors = 0;
        const alerts = [];

        each(fields, f => {
            if (form[f.field].$invalid) {
                if (form[f.field].$pristine) {
                    alerts.push({ msg: `Please enter ${f.name}`, field: f.name });
                } else {
                    alerts.push({ msg: `Invalid ${f.name}`, field: f.name });
                }
                numErrors++;
            } else {
                this.alerts = filter(this.alerts, alert => {
                    return alert.field !== f.name;
                });
            }
        });

        this.alerts = unionBy(alerts, this.alerts, 'field');

        return numErrors > 0 ? false : true;
    }

    acceptOrderPreview(order, creditCardForm, shippingAddressForm) {
        let creditCardValid;
        const addressValid = this.validateForm(shippingAddressForm, this.requiredAddressFields);

        if (order.invoiceValue <= 0) {
            creditCardValid = true;
        } else {
            if (this.selectedCardData.id) {
                creditCardValid = true;
            } else {
                creditCardValid = this.validateForm(creditCardForm, this.requiredCreditCardFields);
            }
        }

        if (creditCardValid &&  addressValid) {
            this.initPaymentFlow();
        }
    }

    getCardData(cardData) {
        const data = {};
        data.card = cloneDeep(cardData);

        //TODO: fix expiration field component to return these
        const splitVal = data.card.expiry.split('/');
        data.card.exp_month = Number(splitVal[0]);
        data.card.exp_year = Number(splitVal[1]);
        delete data.card.expiry;
        delete data.card.isDefault;

        return data;
    }

    initPaymentFlow() {
        // existing stripe customer
        if (this.customer.paymentCustomerId) {
            if (this.selectedCardData.id) {
                this.onStripeCardComplete(this.selectedCardData.id, this.customer.paymentCustomerId);
            } else {
                const data = this.getCardData(this.selectedCardData);

                this.stripeService.createToken({ data })
                    .then(resp => {
                        if (resp.data.error) {
                            this.notificationsService.alert({ msg: resp.data.error.message });
                        } else {
                            const data = {
                                card: resp.data.id
                            };

                            // add card
                            this.stripeService.addCard({ customerId: this.customer.paymentCustomerId, data })
                                .then(resp => {
                                    if (resp.data.error) {
                                        this.notificationsService.alert({ msg: resp.data.error.message });
                                    } else {
                                        this.facebookService.trackPixel('track', 'AddPaymentInfo');

                                        // update to default source
                                        if (this.selectedCardData.isDefault) {
                                            const customerId = this.customer.paymentCustomerId;
                                            const data = {
                                                default_source: resp.data.id
                                            };
                                            this.stripeService.updateCustomer({ customerId, data })
                                                .then(resp => {
                                                    if (resp.data.error) {
                                                        this.notificationsService.alert({ msg: resp.data.error.message });
                                                    } else {
                                                        this.onStripeCardComplete(resp.data.default_source, this.customer.paymentCustomerId);
                                                    }
                                                }, err => {
                                                    this.notificationsService.alert({ msg: err.message });
                                                });
                                        } else {
                                            this.onStripeCardComplete(resp.data.id, this.customer.paymentCustomerId);
                                        }
                                    }
                                });
                        }
                    }, err => {
                        this.notificationsService.alert({ msg: err.message });
                    });
            }
        } else { // new stripe customer
            const data = this.getCardData(this.selectedCardData);

            this.stripeService.createToken({ data })
                .then(resp => {
                    if (resp.data.error) {
                        this.notificationsService.alert({ msg: resp.data.error.message });
                    } else {
                        const data = {
                            card: resp.data.id,
                            email: this.customer.email
                        };

                        this.stripeService.createCustomer({ data })
                            .then(resp => {
                                if (resp.data.error) {
                                    this.notificationsService.alert({ msg: resp.data.error.message });
                                } else {
                                    const config = {
                                        params: {
                                            paymentCustomerId: resp.data.id
                                        }
                                    };

                                    this.customerService.updateEntity({ config })
                                        .then(resp => {
                                            this.authService.setCurrentUser(resp.data.data);
                                            this.onStripeCardComplete(resp.data.default_source, resp.data.id);
                                        });
                                }
                            }, err => {
                                this.notificationsService.alert({ msg: err.message });
                            });
                    }
                }, err => {
                    this.notificationsService.alert({ msg: err.message });
                });
        }
    }

    onStripeCardComplete(cardId, paymentCustomerId) {
        let chargeAmount = this.order.invoiceValue;
        chargeAmount = parseInt(Math.round(chargeAmount * 100));
        const description = this.getOrderTitle();
        const capture = true;

        this.proceedWithCharge(cardId, paymentCustomerId, chargeAmount, capture, description);
        /*
        this.checkOrderTransactionStatus({
            callback(payments) {
                console.log(payments);
            }
        });*/
    }

    onStripeChargeComplete(data) {
        console.log(data);
    }

    proceedWithCharge(card, customer, amount, capture, description) {
        const data = {
            card,
            customer,
            amount,
            capture,
            description,
            currency: 'usd'
        };

        this.stripeService.addCharge({ data })
            .then(resp => {
                if (resp.data.error) {
                    this.notificationsService.alert({ msg: resp.data.error.message });
                } else {
                    const data = {
                        transactionId: resp.data.id,
                        paymentAmount: parseFloat(amount / 100)
                    };
                    this.onStripeChargeComplete(data);
                }
            }, err => {
                this.notificationsService.alert({ msg: err.message });
            });
    }

    checkOrderTransactionStatus(opts) {
        opts = opts || {};
        opts.callback = opts.callback || (() => {});

        const config = {
            params: {
                orderNumber: this.order.orderNumber,
                expand: 'orderItems/product,productNeeds/productCategory,refunds,payments'
            }
        };

        this.orderService.findByOrderNumber({ config })
            .then(resp => {
                opts.callback(resp.data.data.payments);
            });
    }

    isAddressFormValid() {
        return Boolean(
            this.selectedAddressData.addresseeFirstName &&
            this.selectedAddressData.addresseeLastName &&
            this.selectedAddressData.addressLine1 &&
            this.selectedAddressData.city &&
            this.selectedAddressData.state &&
            this.selectedAddressData.zip &&
            this.selectedAddressData.addresseePhone
        );   
    }

    isCreditCardFormValid() {
        return Boolean(
            this.selectedCardData.name &&
            this.selectedCardData.number &&
            this.selectedCardData.expiry &&
            //this.selectedCardData.exp_month &&
            //this.selectedCardData.exp_year &&
            this.selectedCardData.cvc &&
            this.selectedCardData.address_zip
        );
    }
}
