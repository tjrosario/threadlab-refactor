import template from './view.html';
import controller from './controller'

export default function layoutRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.account.subscriptions', {
            url: '/account/subscriptions',
            template,
            controller,
            controllerAs: '$ctrl',
            requireLogin: true,
            resolve: {
                customer: function ($q, customerService) {
                    'ngInject';
                    const config = {
                        params: {
                            expand: 'addresses,subscriptions'
                        }
                    };

                    return $q.all([
                        customerService.getEntity({ config })
                    ]);
                }
            }
        });
}
