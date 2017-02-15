import cloneDeep from 'lodash/cloneDeep';

/* @ngInject */
export default class ResetPasswordForm {
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
        return  this.formData.password;
    }

    submit() {
    	this.close({$value: this.prepareFormData()});
    }

    cancel() {
    	this.dismiss({$value: ''});
    }
}