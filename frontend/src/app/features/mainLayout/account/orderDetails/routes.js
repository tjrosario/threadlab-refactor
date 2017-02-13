import template from './view.html';
import controller from './controller';

export default function routes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.account.orderDetails', {
            url: '/order/:id',
            template,
            controller,
            controllerAs: '$ctrl',
            requireLogin: true,
            title: 'Order Details',
            resolve: {
                order: function ($q, $stateParams, orderService) {
                    'ngInject';
                    const id = $stateParams.id;

                    const config = {
                        params: {
                            orderNumber: id,
                            expand: 'orderItems/product,productNeeds/productCategory,refunds,payments'
                        }
                    };

                    return $q.all([
                        orderService.findByOrderNumber({ config })
                    ]);
                },
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