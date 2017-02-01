import angular from 'angular';

const serviceName = 'globalNavigation';

class GlobalNavigationService {
    constructor(accountNavigationService) {
        'ngInject';
        this.accountNavigationService = accountNavigationService;
    }

    getUserEntities() {
        return this.accountNavigationService.getEntities();
    }

    getGuestEntities() {
        return [{
            'name': 'Get Started',
            'state': 'index.signup'
        }, {
            'name': 'Sign In',
            'state': 'index.login'
        }, {
            'name': 'How it Works',
            'state': 'index.howItWorks'
        }, {
            'name': 'Boxes',
            'state': 'index.boxes'
        }, {
            'name': 'PerfectFit',
            'state': 'index.perfectFit'
        }, {
            'name': 'Brand Preferences',
            'state': 'index.brandPreferences'
        }, {
            'name': 'About',
            'state': 'index.about'
        }, {
            'name': 'FAQ',
            'state': 'index.faq'
        }, {
            'name': 'Contact Us',
            'state': 'index.contact'
        }, {
            'name': 'Referrals',
            'external': true,
            'url': 'http://threadlab.referralcandy.com'
        }, {
            'name': 'Affiliates',
            'state': 'index.affiliates'
        }, {
            'name': 'Blog',
            'external': true,
            'url': 'http://blog.mythreadlab.com'
        }, {
            'name': 'Purchase a Gift Card',
            'external': true,
            'url': 'https://store.mythreadlab.com/collections/gift-cards'
        }, {
            'name': 'Terms of Use',
            'state': 'index.termsOfUse'
        }, {
            'name': 'Privacy Policy',
            'state': 'index.privacyPolicy'
        }];
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, GlobalNavigationService)
    .name;