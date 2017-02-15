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
            redirectTo: 'index.signup.shirtSize',
            requireGuest: true,
            resolve: {
                init: function ($q, sizeService) {
                    'ngInject';
                }
            }
        });
}
