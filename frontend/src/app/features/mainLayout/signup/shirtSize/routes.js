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
