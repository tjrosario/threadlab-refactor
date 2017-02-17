import { componentName as idleStartForm } from 'components/idleStartForm/component';
import { componentName as idleTimeoutForm } from 'components/idleTimeoutForm/component';

/* @ngInject */
export default class MainLayout {
    constructor(globalNavigationService, authService, notificationsService, userModel, $rootScope, $state, $scope, $uibModal, Idle) {
        this.globalNavigationService = globalNavigationService;
        this.authService = authService;
        this.notificationsService = notificationsService;
        this.userModel = userModel;
        this.$rootScope = $rootScope;
        this.$scope = $scope;
        this.$state = $state;
        this.$uibModal = $uibModal;
        this.Idle = Idle;
    }

    $onInit() {
        this.$rootScope.$on('$stateChangeStart', this.handleStateChangeStart.bind(this));
        this.$rootScope.$on('$stateChangeSuccess', this.handleStateChangeSuccess.bind(this));
        this.checkCurrentUser();
        this.navFooterItems = this.globalNavigationService.getPublicEntities();
        this.$scope.$on('IdleStart', this.handleIdleStart.bind(this));
        this.$scope.$on('IdleTimeout', this.handleIdleTimeout.bind(this));
        this.$rootScope.isMenuOpen = false;
    }

    handleIdleStart() {
        this.idleStartModalInstance = this.$uibModal.open({
            animation: true,
            component: idleStartForm,
            resolve: {
                config: () => ({
                    title: "You've been idle"
                })
            }
        });
    }

    handleIdleTimeout() {
        this.logout();
        this.idleStartModalInstance.close();

        const modalInstance = this.$uibModal.open({
            animation: true,
            component: idleTimeoutForm,
            resolve: {
                config: () => ({
                    title: "Your session has timed out"
                })
            }
        });

        modalInstance.result.then(formData => {
            this.$state.go('index.login');
        });
    }

    checkCurrentUser() {
        if (this.userModel.loggedUser) {
            this.onUserAuthenticated();
        } else {
            this.onUserUnauthenticated();
        }
    }

    onUserAuthenticated() {
        this.navItems = this.globalNavigationService.getUserEntities();
        this.userNavItems = this.getUserNavItems();
        this.Idle.watch();
    }

    onUserUnauthenticated() {
        this.navItems = this.globalNavigationService.getGuestEntities();
        this.userNavItems = this.getGuestNavItems();
        this.checkMenu();
    }

    getGuestNavItems() {
        return [{
            'name': 'How it Works',
            'state': 'index.howItWorks'
        }, {
            'name': 'Sign In',
            'state': 'index.login'
        }, {
            'name': 'Get Started',
            'state': 'index.signup'
        }];
    }

    getUserNavItems() {
        return [{
            'name': 'My Account',
            'state': 'index.account.index'
        }, {
            'name': 'Place Order',
            'state': 'index.placeOrder'
        }];
    }

    toggleMenu() {
        this.$rootScope.isMenuOpen = !this.$rootScope.isMenuOpen;
    }

    checkMenu() {
        if (this.$rootScope.isMenuOpen) {
            this.toggleMenu();
        }  
    }

    handleStateChangeStart(e, toState, toParams, fromState, fromParams) {
        this.checkCurrentUser();
    }

    handleStateChangeSuccess(e, toState) {
        this.checkMenu();
    }

    logout() {
        this.authService.logout().then(() => {
            this.authService.clearUser();
            this.$state.go('index.home');
            this.onUserUnauthenticated();
            this.Idle.unwatch();
        }, err => {
            //this.notificationsService.alert({msg: [].concat(err.message)[0]});
        });
    }
}
