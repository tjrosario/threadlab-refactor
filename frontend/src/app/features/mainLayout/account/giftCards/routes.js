import template from './view.html';
import controller from './controller'

export default function layoutRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.account.giftCards', {
            url: '/gift-cards',
            template,
            controller,
            controllerAs: '$ctrl',
            requireLogin: true,
            metaTags: {
                title: 'Gift Cards | My Account'
            },
            resolve: {
                customer: function ($q, customerService) {
                    'ngInject';
                    /*
                    const config = {
                        params: {
                            expand: 'addresses'
                        }
                    };

                    return $q.all([
                        customerService.getEntity({ config })
                    ]); */
                }
            }
        });
}
