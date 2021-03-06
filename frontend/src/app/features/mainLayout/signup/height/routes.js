import template from './view.html';
import controller from './controller';

export default function layoutRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.signup.height', {
            url: '/height',
            template,
            controller,
            controllerAs: '$ctrl',
            metaTags: {
                title: 'Height | Signup'
            },
            requireGuest: true,
            resolve: {
                init: function($q, sizeService) {
                    'ngInject';
                }
            }
        });
}
