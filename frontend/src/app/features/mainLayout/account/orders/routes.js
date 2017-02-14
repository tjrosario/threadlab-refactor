import template from './view.html';
import controller from './controller'

export default function layoutRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.account.orders', {
            url: '/orders',
            template,
            controller,
            controllerAs: '$ctrl',
            requireLogin: true,
            title: 'Orders',
            metaTags: {
                title: 'Orders | My Account'
            },
            resolve: {
                customer: function ($q, customerService) {
                    'ngInject';
                    const config = {
                        params: {
                            expand: 'orders'
                        }
                    };

                    return $q.all([
                        customerService.getEntity({ config })
                    ]);
                }
            }
        });
}
