import template from './view.html';
import controller from './controller';

export default function layoutRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.signup.waistSize', {
            url: '/waist-size',
            template,
            controller,
            controllerAs: '$ctrl',
            metaTags: {
                title: 'Waist Size | Signup'
            },
            requireGuest: true,
            resolve: {
                genericWaistSizes: function($q, sizeService) {
                    'ngInject';

                    const config = {
                        params: {
                            xProductMeasurement: 'Generic Waist'
                        }
                    };

                    return $q.all([
                        sizeService.findAll({ config })
                    ]); 
                }
            }
        });
}
