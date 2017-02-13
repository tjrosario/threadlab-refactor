import cloneDeep from 'lodash/cloneDeep';
import filter from 'lodash/filter';

/* @ngInject */
export default class AccountOrderDetails {
    constructor(order, orderService, customerService, notificationsService, userModel, CONFIG, $window, $scope) {
    	this.order = order[0].data.data;
        this.customerService = customerService;
        this.notificationsService = notificationsService;
        this.userModel = userModel;
        this.appConfig = CONFIG;
        this.$window = $window;
        this.$scope = $scope;
    }

    $onInit() {
        this.currentUser = this.userModel.loggedUser;
        this.paymentMethodMode = 'add';
        this.order.paymentMethod = this.order.paymentMethod || 'stripe';
        this.getCards();
        this.setupPaypalFields();

        this.setNumRejectedOrderItems(this.getRejectedOrderItems(this.order).length);
        this.setNumReturnedOrderItems(this.getReturnedOrderItems(this.order).length);

        this.$scope.$on('orderPricingUpdated', (event, args) => {
            this.setNumRejectedOrderItems(this.getNumRejectedOrderItems());
            this.setNumReturnedOrderItems(this.getNumReturnedOrderItems());
        });
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
                }
            }, err => {
                this.notificationsService.alert({msg: err.message});
            });
        }
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
}
