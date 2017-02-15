import template from './view.html';
import controller from './controller';

export default function layoutRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.signup.shirtSize', {
            url: '/shirt-size',
            template,
            controller,
            controllerAs: '$ctrl',
            requireGuest: true,
            metaTags: {
                title: 'Shirt Size | Signup'
            },
            requireGuest: true,
            resolve: {
                casualShirtSizes: function ($q, sizeService) {
                    'ngInject';

                    const config = {
                        params: {
                            xProductMeasurement: 'Generic Shirt Size',
                            xProductCategory: 'Casual Shirt'
                        }
                    };

                    return $q.all([
                        sizeService.findAll({ config })
                    ]);
                }
            }
        });
}
