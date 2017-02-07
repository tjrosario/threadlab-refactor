import template from './view.html';
import controller from './controller';

export default function layoutRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.signup.weight', {
            url: '/weight',
            template,
            controller,
            controllerAs: '$ctrl',
            resolve: {
                init: function($q, sizeService) {
                    'ngInject';
                }
            }
        });
}
