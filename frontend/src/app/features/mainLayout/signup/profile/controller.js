/* @ngInject */
export default class Profile {
    constructor($state, customerSignupModel) {
        this.$state = $state;
        this.formData = {};
        this.customerSignupModel = customerSignupModel;
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
    	this.customerSignupModel.user.profile = this.formData;

        this.$state.go('index.signup.shirtSize');
    }
}
