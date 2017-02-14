import template from './view.html';
import controller from './controller'

export default function layoutRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.account.brandPreferences', {
            url: '/brand-preferences',
            template,
            controller,
            controllerAs: '$ctrl',
            requireLogin: true,
            metaTags: {
                title: 'Brand Preferences | My Account'
            },
            resolve: {
                customer: function ($q, customerService) {
                    'ngInject';
                    const config = {
                        params: {
                            expand: 'brandDislikes/brand'
                        }
                    };

                    return $q.all([
                        customerService.getEntity({ config })
                    ]);
                },
                brands: function ($q, brandService) {
                    'ngInject';

                    return $q.all([
                        brandService.getEntities({})
                    ]);
                }
            }
        });
}
