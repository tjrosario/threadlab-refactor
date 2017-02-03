import template from './view.html';
import controller from './controller'

export default function layoutRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.account.paymentSettings', {
            url: '/account/payment-settings',
            template,
            controller,
            controllerAs: '$ctrl',
            requireLogin: true,
            resolve: {
                customer: function ($q, userModel) {
                    'ngInject';
                }
            }
        });
}
