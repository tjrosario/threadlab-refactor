import cloneDeep from 'lodash/cloneDeep';

/* @ngInject */
export default class RequestPasswordResetForm {
    constructor() {
    	this.formData = {};
    }

    $onInit() {
    	
    }

    prepareFormData() {
    	const formData = cloneDeep(this.formData);

    	return formData;
    }

    isRequiredFieldsValid() {
        return  this.formData.username;
    }

    submit() {
    	this.close({$value: this.prepareFormData()});
    }

    cancel() {
    	this.dismiss({$value: ''});
    }
}