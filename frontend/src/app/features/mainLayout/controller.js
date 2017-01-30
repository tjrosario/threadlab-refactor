/* @ngInject */
export default class MainLayout {
    constructor(globalNavigationService) {
        this.globalNavigationService = globalNavigationService;
    }

    $onInit() {
        this.navItems = this.globalNavigationService.getEntities();
    }

    get loggedUserName() {
        
    }

    get pageTitle() {
        
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }

    logout() {

    }
}
