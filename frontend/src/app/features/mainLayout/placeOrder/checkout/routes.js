import template from './view.html';
import controller from './controller'

export default function layoutRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.placeOrderCheckout', {
            url: '/place-order/:orderNumber/checkout',
            template,
            controller,
            controllerAs: '$ctrl',
            requireLogin: true,
            metaTags: {
                title: 'Checkout | Place Order'
            },
            resolve: {
                order: function ($q, $stateParams, orderService) {
                    'ngInject';
                    const orderNumber = $stateParams.orderNumber;

                    const config = {
                        params: {
                            orderNumber,
                            expand: 'orderItems/product,productNeeds/productCategory'
                        }
                    };

                    return $q.all([
                        orderService.findByOrderNumber({ config })
                    ]);
                }
            }
        });
}
