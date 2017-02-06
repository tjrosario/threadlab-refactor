import cloneDeep from 'lodash/cloneDeep';

/* @ngInject */
export default class PaymentForm {
    constructor() {
    	this.card = this.resolve.card || {};
        this.mode = this.resolve.mode;
    }

    $onInit() {
    	this.formData = cloneDeep(this.card);
        if (this.mode === 'edit') {
            this.formData.expiry = this.card.exp_month + '/' + this.card.exp_year;
        }
    }

    prepareFormData() {
    	const formData = cloneDeep(this.formData);

    	return formData;
    }

    isRequiredFieldsValid() {
        if (this.mode === 'add') {
            return  this.formData.name &&
                    this.formData.number &&
                    this.formData.expiry &&
                    this.formData.cvc &&
                    this.formData.address_zip;
        }

        if (this.mode === 'edit') {
            return  this.formData.name &&
                    this.formData.expiry &&
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