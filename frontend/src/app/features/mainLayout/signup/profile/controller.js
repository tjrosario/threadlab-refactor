/* @ngInject */
export default class Profile {
    constructor($state) {
        this.$state = $state;
        this.formData = {};
    }

    $onInit() {
        
    }

    isValidRequiredFields() {
    	return	this.formData.firstName &&
    			this.formData.lastName &&
    			this.formData.email &&
    			this.formData.password;
    }

    signup() {
    	console.log(this.formData);
    }
}
