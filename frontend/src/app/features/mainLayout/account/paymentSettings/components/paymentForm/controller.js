import cloneDeep from 'lodash/cloneDeep';

/* @ngInject */
export default class PaymentForm {
    constructor() {
    	this.card = this.resolve.card || {};
        this.mode = this.resolve.mode;
    }

    $onInit() {
    	this.formData = cloneDeep(this.card);
    }

    prepareFormData() {
    	const formData = cloneDeep(this.formData);

    	return formData;
    }

    isRequiredFieldValid() {
        if (this.mode === 'add') {
            console.log(this.formData);
            return  this.formData.name &&
                    this.formData.number &&
                    this.formData.exp_date &&
                    this.formData.cvc &&
                    this.formData.address_zip;
        }
    }

    submit() {
    	this.close({$value: this.prepareFormData()});
    }

    cancel() {
    	this.dismiss({$value: ''});
    }
}