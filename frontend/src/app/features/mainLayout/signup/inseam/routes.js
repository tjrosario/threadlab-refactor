import template from './view.html';
import controller from './controller';

export default function layoutRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.signup.inseam', {
            url: '/inseam',
            template,
            controller,
            controllerAs: '$ctrl',
            metaTags: {
                title: 'Inseam | Signup'
            },
            requireGuest: true,
            resolve: {
                genericInseams: function($q, sizeService) {
                    'ngInject';

                    const config = {
                        params: {
                            xProductMeasurement: 'Generic Inseam'
                        }
                    };

                    return $q.all([
                        sizeService.findAll({ config })
                    ]); 
                }
            }
        });
}
