import template from './view.html';
import controller from './controller'

export default function layoutRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.account.addresses', {
            url: '/account/addresses',
            template,
            controller,
            controllerAs: '$ctrl',
            requireLogin: true,
            resolve: {
                customer: function ($q, customerService) {
                    'ngInject';
                    const params = {
                        params: {
                            expand: 'addresses'
                        }
                    };

                    return $q.all([
                        customerService.getEntity({ config: params })
                    ]);
                }
            }
        });
}
