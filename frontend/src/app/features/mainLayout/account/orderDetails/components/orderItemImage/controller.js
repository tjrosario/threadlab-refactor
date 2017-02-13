/* @ngInject */
export default class OrderItemImage {
    constructor() {
    	this.orderItem = this.resolve.orderItem || {};
    }

    $onInit() {
    	
    }

    cancel() {
    	this.dismiss({$value: ''});
    }
}