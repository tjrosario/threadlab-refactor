import angular from 'angular';

const serviceName = 'accountNavigation';

class AccountNavigationService {
    constructor() {
        'ngInject';
    }

    getEntities() {
        return [{
            'name': 'My Account',
            'state': 'index.account.index'
        }, {
            'name': 'Subscriptions',
            'state': 'index.account.subscriptions'
        }, {
            'name': 'Order History',
            'state': 'index.account.orders'
        }, {
            'name': 'PerfectFit',
            'state': 'index.account.perfectFit'
        }, {
            'name': 'Product Preferences',
            'state': 'index.account.productPreferences'
        }, {
            'name': 'Brand Preferences',
            'state': 'index.account.brandPreferences'
        }, {
            'name': 'Payment Methods',
            'state': 'index.account.paymentMethods'
        }, {
            'name': 'Addresses',
            'state': 'index.account.addressSettings'
        }, {
            'name': 'Gift Cards',
            'state': 'index.account.giftCards'
        }, {
            'name': 'Referrals',
            'state': 'index.account.referrals'
        }];
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, AccountNavigationService)
    .name;