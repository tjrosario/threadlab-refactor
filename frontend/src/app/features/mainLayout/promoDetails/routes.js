import template from './view.html';

import controller from './controller';

export default function routes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.promoDetails', {
            url: '/promo/:name',
            template,
            controller,
            controllerAs: '$ctrl',
            title: 'Promo',
            metaTags: {
                title: 'Promo Details'
            },
            resolve: {
                promo: function ($q, $stateParams, promoService) {
                    'ngInject';
                    const name = $stateParams.name;

                    const config = {
                        params: {
                            name
                        }
                    };

                    return promoService.find({ config });
                }
            }
        });
}