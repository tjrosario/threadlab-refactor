import template from './view.html';
import controller from './controller';

export default function layoutRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.account', {
            abstract: true,
            url: '/account',
            template,
            controller,
            controllerAs: '$ctrl',
            requireLogin: true,
            metaTags: {
                title: 'My Account'
            },
            resolve: {
                init: function ($q) {
                    'ngInject';
                }
            }
        });
}
