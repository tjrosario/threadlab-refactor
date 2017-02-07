import template from './view.html';
import controller from './controller';

export default function layoutRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.signup.pantsFit', {
            url: '/pants-fit',
            template,
            controller,
            controllerAs: '$ctrl',
            resolve: {
                genericPantFits: function ($q, attributeService) {
                    'ngInject';

                    const config = {
                        params: {
                            xCharacteristic: 'Generic Pant Fit'
                        }
                    };

                    return $q.all([
                        attributeService.findAll({ config })
                    ]);
                }
            }
        });
}
