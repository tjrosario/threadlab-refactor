import cloneDeep from 'lodash/cloneDeep';
import filter from 'lodash/filter';

/* @ngInject */
export default class AccountOrderDetails {
    constructor(order, orderService) {
    	this.order = order[0].data.data;
    }

    $onInit() {
        this.paymentMethodMode = 'add';
        this.paymentMethod = 'stripe';

        this.numRejects = this.getRejectedItems(this.order).length;
    }

    getRejectedItems(data) {
    	const result = cloneDeep(data);
    	const orderItems = result.orderItems;

    	const rejected = filter(orderItems, item => {
    		return item.rejected;
    	});

    	return rejected;
    }

    setNumRejectedItems(num) {
    	this.numRejects = num;
    }
}
