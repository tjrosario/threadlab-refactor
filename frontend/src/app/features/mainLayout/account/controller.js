/* @ngInject */
export default class Account {
    constructor(accountNavigationService) {
        this.accountNavigationService = accountNavigationService;
    }

    $onInit() {
        this.navItems = this.accountNavigationService.getEntities();
    }
}
