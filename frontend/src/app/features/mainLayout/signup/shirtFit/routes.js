import template from './view.html';
import controller from './controller';

export default function layoutRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.signup.shirtFit', {
            url: '/shirt-fit',
            template,
            controller,
            controllerAs: '$ctrl',
            metaTags: {
                title: 'Shirt Fit | Signup'
            },
            requireGuest: true,
            resolve: {
                genericShirtFits: function ($q, attributeService) {
                    'ngInject';

                    const config = {
                        params: {
                            xCharacteristic: 'Generic Shirt Fit'
                        }
                    };

                    return $q.all([
                        attributeService.findAll({ config })
                    ]);
                }
            }
        });
}
