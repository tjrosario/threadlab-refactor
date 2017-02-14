import template from './view.html';
import controller from './controller'

export default function layoutRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.account.subscriptions', {
            url: '/subscriptions',
            template,
            controller,
            controllerAs: '$ctrl',
            requireLogin: true,
            metaTags: {
                title: 'Subscriptions | My Account'
            },
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
