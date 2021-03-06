import template from './view.html';
import controller from './controller'

export default function layoutRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.account.paymentMethods', {
            url: '/payment-methods',
            template,
            controller,
            controllerAs: '$ctrl',
            requireLogin: true,
            metaTags: {
                title: 'Payment Methods | My Account'
            },
            resolve: {
                customer: function ($q, userModel) {
                    'ngInject';
                }
            }
        });
}
