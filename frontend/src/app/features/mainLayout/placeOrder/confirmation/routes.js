import template from './view.html';
import controller from './controller'

export default function layoutRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.placeOrderConfirmation', {
            url: '/place-order/:orderNumber/confirmation',
            template,
            controller,
            controllerAs: '$ctrl',
            requireLogin: true,
            metaTags: {
                title: 'Your Order Confirmation | Place Order'
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
