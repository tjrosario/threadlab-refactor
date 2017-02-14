import template from './view.html';
import controller from './controller'

export default function layoutRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.account.referrals', {
            url: '/referrals',
            template,
            controller,
            controllerAs: '$ctrl',
            requireLogin: true,
            metaTags: {
                title: 'Referrals | My Account'
            },
            resolve: {
                customer: function ($q, customerService) {
                    'ngInject';
                }
            }
        });
}
