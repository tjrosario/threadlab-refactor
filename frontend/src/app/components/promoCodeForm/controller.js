import cloneDeep from 'lodash/cloneDeep';

/* @ngInject */
export default class PromoCodeForm {
    constructor() {
    	const promoCode = cloneDeep(this.data.promoCode);
    	this.data.promoCode = promoCode;
    }

    $onInit() {
        
    }

    isRequiredFieldsValid() {
    	return this.data.promoCode;
    }
}
