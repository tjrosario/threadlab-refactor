/* @ngInject */
export default class AccountOrders {
    constructor(customer, $state) {
        this.customer = customer[0].data.data;
    	this.$state = $state;
    }

    $onInit() {
        
    }

    readOrder(order) {
        this.$state.go('index.account.orderDetails', { id: order.orderNumber });
    }
}
