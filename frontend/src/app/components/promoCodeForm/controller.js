import cloneDeep from 'lodash/cloneDeep';

/* @ngInject */
export default class PromoCodeForm {
    constructor() {
    }

    $onInit() {
        
    }

    isRequiredFieldsValid() {
    	return this.data.promoCode;
    }
}
