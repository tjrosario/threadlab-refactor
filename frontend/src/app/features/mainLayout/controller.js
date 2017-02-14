/* @ngInject */
export default class MainLayout {
    constructor(globalNavigationService, authService, notificationsService, userModel, $rootScope, $state) {
        this.globalNavigationService = globalNavigationService;
        this.authService = authService;
        this.notificationsService = notificationsService;
        this.userModel = userModel;
        this.$rootScope = $rootScope;
        this.$state = $state;
    }

    $onInit() {
        this.$rootScope.$on('$stateChangeStart', this.handleStateChangeStart.bind(this));
        this.$rootScope.$on('$stateChangeSuccess', this.handleStateChangeSuccess.bind(this));
        this.checkCurrentUser();
        this.navFooterItems = this.globalNavigationService.getPublicEntities();
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
            'state': 'index.signup.shirtSize'
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
        this.isMenuOpen = !this.isMenuOpen;
    }

    checkMenu() {
        if (this.isMenuOpen) {
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
        }, err => {
            //this.notificationsService.alert({msg: [].concat(err.message)[0]});
        });
    }
}
