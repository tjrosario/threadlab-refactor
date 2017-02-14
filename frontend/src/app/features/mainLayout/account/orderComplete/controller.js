import cloneDeep from 'lodash/cloneDeep';

/* @ngInject */
export default class AccountOrderComplete {
    constructor(order) {
        this.order = order[0].data.data;
    }

    $onInit() {
    	
    }
}
