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
        this.authService.login(credentials)
            .then(resp => {
                if (resp.data.success) {
                    this.authService.setCurrentUser(resp.data.data);
                    this.$state.go('index.home');
                    this.greetUser();
                } else {
                    const msg = 'Invalid login.  Please double check your credentials';
                    this.notificationsService.alert({ msg });
                }
            }, err => {
                this.notificationsService.alert({ msg: err.message });
            });
    }

    greetUser() {
        const user = this.userModel.loggedUser;
        const title = this.greetingService.getGreeting(new Date().getHours());
        const msg = `Welcome back, ${user.firstName}!`;

        this.notificationsService.info({ msg, title });
    }
}
