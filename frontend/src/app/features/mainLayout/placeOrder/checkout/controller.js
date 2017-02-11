/* @ngInject */
export default class PlaceOrderCheckout {
    constructor(order, userModel, orderService, CONFIG, $window, $state, notificationsService) {
        this.order = order[0].data.data;
        this.userModel = userModel;
        this.orderService = orderService;
        this.currentUser = this.userModel.loggedUser;
        this.appConfig = CONFIG;
        this.$window = $window;
        this.$state = $state;
        this.notificationsService = notificationsService;
    }

    $onInit() {
        this.setupPaypalFields();
        this.refundableDeposit = this.appConfig.deposit;
        this.paymentMethod = 'stripe';
        this.isPaymentRequired = this.currentUser.testScenario !== 'B';
    }

    getOrderTitle() {
        const order = this.order;

        return `Order-${order.orderNumber} (Authorization)`;
    }

    getConfirmReturnPath() {
        const order = this.order;
        const $window = this.$window;

        return `${$window.location.origin}/place-order/${order.orderNumber}/confirmation`;
    }

    getCancelReturnPath() {
        const order = this.order;
        const $window = this.$window;

        return `${$window.location.origin}/place-order/${order.orderNumber}/checkout?cancel_return=true`;
    }

    getOrderAmount() {
        return this.refundableDeposit;
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
            paymentAction: 'authorization',
            custom: this.currentUser.email
        };
    }

    getPaymentMethod() {
        return this.paymentMethod;
    }

    setPaymentMethod(method) {
        this.paymentMethod = method;
    }

    submitPayPalOrder($event) {
        $event.preventDefault();
    }

    submitPromoCode(promoCode) {
        const id = this.order.id;
        const config = {
            params: {
                promoCode
            }
        };

        this.orderService.applyPromo({ id, config })
            .then(resp => {
                if (resp.data.success) {
                    this.notificationsService.success({ msg: 'Promo Code Applied' });
                    
                } else {
                    this.notificationsService.alert({ msg: resp.data.message });
                }
            }, err => {
                this.notificationsService.alert({ msg: err.message });
            });
    }

    confirmOrder() {
        if (this.isPaymentRequired) {

        } else {
            const id = this.order.id;
            const params = {
                isPreviewRequired: true,
                //transactionId,
                paymentAmount: 0,
                paymentMethod: this.getPaymentMethod(),
                //shippingAddress,
                specialInstructions: this.order.specialInstructions,
                promoCode: this.order.promoCode
            };
            const config = {
                params
            };

            this.orderService.finalize({ id, config })
                .then(resp => {
                    if (resp.data.success) {
                        this.notificationsService.success({ msg: 'Order Finalized' });
                        this.$state.go('index.placeOrder.confirmation', {
                            orderNumber: this.order.orderNumber
                        });
                    } else {
                        this.notificationsService.alert({ msg: resp.data.message });
                    }
                }, err => {
                    this.notificationsService.alert({ msg: err.message });
                });
        }
    }
}
