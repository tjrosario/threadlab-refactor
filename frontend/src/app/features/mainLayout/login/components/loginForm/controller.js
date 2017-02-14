import { componentName as requestPasswordResetForm } from 'requestPasswordReset/components/requestPasswordResetForm/component';

/* @ngInject */
export default class LoginForm {
    constructor(authService, userModel, greetingService, notificationsService, customerService, $state, $uibModal) {
        this.authService = authService;
        this.userModel = userModel;
        this.greetingService = greetingService;
        this.notificationsService = notificationsService;
        this.customerService = customerService;
        this.$state = $state;
        this.$uibModal = $uibModal;
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

    requestPasswordReset() {
        const modalInstance = this.$uibModal.open({
            animation: true,
            component: requestPasswordResetForm,
            resolve: {
                config: () => ({
                    title: 'Request Password Reset'
                })
            }
        });

        modalInstance.result.then(formData => {
            const config = {
                params: formData
            };

            this.customerService.getLogin({ config })
                .then(resp => {
                    if (resp.data.success) {
                        this.resetPassword(resp.data.data);
                    } else {
                        this.notificationsService.alert({ msg: resp.data.message });
                    }
                }, err => {
                    this.notificationsService.alert({ msg: err.message });
                });
        });
    }

    resetPassword(data) {
        const id = data.id;

        this.customerService.resetPassword({ id })
            .then(resp => {
                if (resp.data.success) {
                    const msg = `An email has been sent to ${data.email} with instructions on resetting your password`;
                    this.notificationsService.success({ msg });
                } else {
                    this.notificationsService.alert({ msg: resp.data.message });
                }
            }, err => {
                this.notificationsService.alert({ msg: err.message });
            });
    }
}
