import template from './view.html';
import controller from './controller';

export default function layoutRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.signup.profile', {
            url: '/account',
            template,
            controller,
            controllerAs: '$ctrl',
            metaTags: {
                title: 'Create Your Profile | Signup'
            },
            requireGuest: true,
            resolve: {
                init: function ($q, attributeService) {
                    'ngInject';
                }
            }
        });
}
