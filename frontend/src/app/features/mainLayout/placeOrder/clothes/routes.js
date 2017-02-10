import template from './view.html';
import controller from './controller'

export default function layoutRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.placeOrder.clothes', {
            url: '/clothes',
            template,
            controller,
            controllerAs: '$ctrl',
            requireLogin: true,
            resolve: {
                productCategories: function ($q, $timeout, $state, currentOrderModel, productCategoryService) {
                    'ngInject';
                    
                    const box = currentOrderModel.order.box;
                    const deferred = $q.defer();

                    $timeout(() => {
                        if (box) {
                            const config = {
                                params: {
                                    expand: 'productMeasurements/allowedSizes,priceRanges,characteristics/allowedAttributes'
                                }
                            };

                            deferred.resolve(productCategoryService.getEntities({ config }));
                        } else {
                            $state.go('index.placeOrder.boxSize');
                            deferred.reject();
                        }
                    });

                    return deferred.promise;
                }
            }
        });
}
