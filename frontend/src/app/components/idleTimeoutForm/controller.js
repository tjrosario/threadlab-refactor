import cloneDeep from 'lodash/cloneDeep';

/* @ngInject */
export default class IdleTimeoutForm {
    constructor() {
    	
    }

    $onInit() {
    	
    }

    submit() {
    	this.close({$value: ''});
    }

    cancel() {
    	this.dismiss({$value: ''});
    }
}