import template from './view.html';
import controller from './controller';

export default function layoutRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.signup', {
            abstract: true,
            url: '/signup',
            template,
            controller,
            controllerAs: '$ctrl',
            resolve: {
                init: function ($q, sizeService) {
                    'ngInject';
                }
            }
        });
}
