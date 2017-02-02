import template from './view.html';
import controller from './controller'

export default function layoutRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.account.orders', {
            url: '/account/orders',
            template,
            controller,
            controllerAs: '$ctrl',
            requireLogin: true,
            title: 'Orders',
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
