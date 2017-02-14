import template from './view.html';
import controller from './controller'

export default function layoutRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.account.addressSettings', {
            url: '/addresses',
            template,
            controller,
            controllerAs: '$ctrl',
            requireLogin: true,
            metaTags: {
                title: 'Addresses | My Account'
            },
            resolve: {
                customer: function ($q, customerService) {
                    'ngInject';
                    const config = {
                        params: {
                            expand: 'addresses'
                        }
                    };

                    return $q.all([
                        customerService.getEntity({ config })
                    ]);
                }
            }
        });
}
