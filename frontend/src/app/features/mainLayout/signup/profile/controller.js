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
        this.validUsername = -1;
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

            setDelay((() => {
                this.customerService.findEntity({ config })
                    .then(resp => {
                        if (resp.data.success) {
                            this.validUsername = false;
                        } else {
                            this.validUsername = true;
                        }
                    }, err => {
                        this.notificationsService.alert({ msg: err.message });
                    });
            }), 1000);
        }
    }

    signup() {
    	this.customerSignupModel.user.profile = this.formData;

        this.$state.go('index.signup.shirtSize');
    }
}
