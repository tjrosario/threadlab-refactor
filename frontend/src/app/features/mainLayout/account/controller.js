/* @ngInject */
export default class MainLayout {
    constructor(accountNavigationService) {
        this.accountNavigationService = accountNavigationService;
    }

    $onInit() {
        this.navItems = this.accountNavigationService.getEntities();
    }
}
