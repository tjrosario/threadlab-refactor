import template from './view.html';
import controller from './controller'

export default function layoutRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.signup.confirmation', {
            url: '/:type/confirmation',
            template,
            controller,
            controllerAs: '$ctrl',
            requireLogin: true,
            metaTags: {
                title: 'Signup Complete! | Signup'
            },
            resolve: {
                order: function ($q, $stateParams, orderService) {
                    'ngInject';
                    const type = $stateParams.type;

                    /*
                    const config = {
                        params: {
                            orderNumber,
                            expand: 'orderItems/product,productNeeds/productCategory'
                        }
                    };

                    return $q.all([
                        orderService.findByOrderNumber({ config })
                    ]); */
                }
            }
        });
}
