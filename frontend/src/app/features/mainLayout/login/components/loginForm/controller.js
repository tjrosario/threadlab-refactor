/* @ngInject */
export default class LoginForm {
    constructor(authService, userModel, greetingService, notificationsService, $state) {
        this.authService = authService;
        this.userModel = userModel;
        this.greetingService = greetingService;
        this.notificationsService = notificationsService;
        this.$state = $state;
    }

    login(credentials) {
    	this.authService.login(credentials).then(() => {
    		if (this.userModel.loggedUser) {
    			this.$state.go('index.home');
                this.greetUser();
    		}
    	}, err => {
            console.log('error');
            //this.notificationsService.alert({msg: [].concat(err.message)[0]});
        });
    }

    greetUser() {
        const user = this.userModel.loggedUser;
        const title = this.greetingService.getGreeting(new Date().getHours());
        const msg = `Welcome back, ${user.firstName}!`;

        this.notificationsService.info({ msg, title });
    }
}
