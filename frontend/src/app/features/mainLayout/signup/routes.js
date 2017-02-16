import template from './view.html';
import controller from './controller';

export default function layoutRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.signup', {
            url: '/signup',
            template,
            controller,
            controllerAs: '$ctrl',
            redirectTo: 'index.signup.profile',
            requireGuest: true,
            resolve: {
                init: function ($q, sizeService) {
                    'ngInject';
                }
            }
        });
}
