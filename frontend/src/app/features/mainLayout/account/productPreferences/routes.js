import template from './view.html';
import controller from './controller'

export default function layoutRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.account.productPreferences', {
            url: '/product-preferences',
            template,
            controller,
            controllerAs: '$ctrl',
            requireLogin: true,
            metaTags: {
                title: 'Product Preferences | My Account'
            },
            resolve: {
                customer: function ($q, customerService) {
                    'ngInject';
                    const config = {
                        params: {
                            expand: 'styleDislikes/attribute,pricePreferences/priceRange,measurementPreferences/size'
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
                            expand: 'productMeasurements/allowedSizes,priceRanges,characteristics/allowedAttributes'
                        }
                    };

                    return $q.all([
                        productCategoryService.getEntities({ config })
                    ]);
                }
            }
        });
}
