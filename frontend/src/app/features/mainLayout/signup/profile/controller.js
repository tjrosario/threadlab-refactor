import setDelay from 'utils/setDelay';

/* @ngInject */
export default class Profile {
    constructor($state, customerSignupModel, customerService) {
        this.$state = $state;
        this.formData = {};
        this.customerSignupModel = customerSignupModel;
        this.customerService = customerService;
    }

    $onInit() {
        this.validUsername = false;
    }

    isValidRequiredFields() {
    	return	this.formData.firstName &&
    			this.formData.lastName &&
    			this.formData.email &&
    			this.formData.password &&
                this.validUsername;
    }

    checkUsername() {
        if (this.formData.email) {
            const config = {
                params: {
                    email: this.formData.email
                }
            };

            this.validUsername = false;
            this.complete = false;

            setDelay((() => {
                this.loading = true;
                this.customerService.findEntity({ config })
                    .then(resp => {
                        if (resp.data.success) {
                            this.validUsername = false;
                        } else {
                            this.validUsername = true;
                        }
                        this.loading = false;
                        this.complete = true;
                    }, err => {
                        this.notificationsService.alert({ msg: err.message });
                        this.loading = false;
                    });
            }), 1000);
        }
    }

    signup() {
    	this.customerSignupModel.user.profile = this.formData;

        this.$state.go('index.signup.shirtSize');
    }
}
