/* @ngInject */
export default class AccountOrderDetails {
    constructor(order) {
    	this.order = order[0].data.data;
    }

    $onInit() {
        
    }
}
