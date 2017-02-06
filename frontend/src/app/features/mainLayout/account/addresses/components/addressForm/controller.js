import cloneDeep from 'lodash/cloneDeep';

/* @ngInject */
export default class AddressForm {
    constructor() {
    	this.address = this.resolve.address || {};
    }

    $onInit() {
    	this.formData = cloneDeep(this.address);
    }

    prepareFormData() {
    	const formData = cloneDeep(this.formData);

    	return formData;
    }

    isRequiredFieldsValid() {
        return  this.formData.addresseeFirstName &&
                this.formData.addresseeLastName &&
                this.formData.addressLine1 &&
                this.formData.city &&
                this.formData.state &&
                this.formData.zip &&
                this.formData.addresseePhone;
    }

    submit() {
    	this.close({$value: this.prepareFormData()});
    }

    cancel() {
    	this.dismiss({$value: ''});
    }
}