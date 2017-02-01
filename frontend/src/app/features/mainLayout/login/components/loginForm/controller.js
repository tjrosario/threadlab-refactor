/* @ngInject */
export default class LoginForm {
    constructor(authService, userModel, $state) {
        this.authService = authService;
        this.userModel = userModel;
        this.$state = $state;
    }

    login(credentials) {
    	this.authService.login(credentials).then(() => {
    		if (this.userModel.loggedUser) {
    			this.$state.go('index.home');
    		}
    	}, err => {
            console.log('error');
            //this.notificationsService.alert({msg: [].concat(err.message)[0]});
        });
    }
}
