import template from './view.html';
import controller from './controller'

export default function layoutRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.account.perfectFit', {
            url: '/perfect-fit',
            template,
            controller,
            controllerAs: '$ctrl',
            requireLogin: true,
            resolve: {
                customer: function ($q, customerService) {
                    'ngInject';
                    const config = {
                        params: {
                            expand: 'measuredKeptOrderItems/product/measurements,referenceItems/orderItem/product/measurements,referenceItems/customerMeasurements/dimension'
                        }
                    };

                    return $q.all([
                        customerService.getEntity({ config })
                    ]);
                },
                productCategories: function ($q, productCategoryService) {
                    'ngInject';
                    const config = {
                        params: {
                            expand: 'dimensions'
                        }
                    };

                    return $q.all([
                        productCategoryService.getEntities({ config })
                    ]);
                }
            }
        });
}
