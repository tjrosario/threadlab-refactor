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
            metaTags: {
                title: 'Weight | Signup'
            },
            requireGuest: true,
            resolve: {
                init: function($q, sizeService) {
                    'ngInject';
                }
            }
        });
}
