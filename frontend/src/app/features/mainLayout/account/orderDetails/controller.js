import cloneDeep from 'lodash/cloneDeep';
import filter from 'lodash/filter';
import first from 'lodash/first';
import find from 'lodash/find';
import each from 'lodash/each';
import unionBy from 'lodash/unionBy';

/* @ngInject */
export default class AccountOrderDetails {
    constructor(order, customer, orderService, customerService, notificationsService, stripeService, userModel, CONFIG, $window, $scope) {
    	this.order = order[0].data.data;
        this.customer = customer[0].data.data;
        this.customerService = customerService;
        this.notificationsService = notificationsService;
        this.stripeService = stripeService;
        this.userModel = userModel;
        this.appConfig = CONFIG;
        this.$window = $window;
        this.$scope = $scope;
    }

    $onInit() {
        this.currentUser = this.userModel.loggedUser;
        this.paymentMethodMode = 'add';
        this.order.paymentMethod = this.order.paymentMethod || 'stripe';
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
            field: "exp_month",
            name: "Expiration Month"
        }, {
            field: "exp_year",
            name: "Expiration Year"
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
    }

    acceptOrderPreview(order, creditCardForm, shippingAddressForm) {
        this.validateForm(creditCardForm, this.requiredCreditCardFields);
        this.validateForm(shippingAddressForm, this.requiredAddressFields);

        /*
        if (order.invoiceValue <= 0) {

        } else {
            this.initPaymentFlow();
        }*/
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

    initPaymentFlow() {
        if (this.customer.paymentCustomerId) {
            if (this.selectedCardData && this.selectedCardData.id) {
                this.onStripeCardComplete(this.selectedCardData.id, this.customer.paymentCustomerId);
            } else {
                const data = this.selectedCardData;

                this.stripeService.createToken({ data })
                    .then(resp => {
                        console.log(resp);
                    }, err => {
                        this.notificationsService.alert({ msg: err.message });
                    });
            }

        }
    }

    onStripeCardComplete() {

    }
}
