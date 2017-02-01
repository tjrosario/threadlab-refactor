import template from './view.html';
import controller from './controller';

export default function layoutRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.account', {
            abstract: true,
            url: '',
            template,
            controller,
            controllerAs: '$ctrl',
            requireLogin: true,
            resolve: {
                init: function ($q) {
                    'ngInject';
                }
            }
        });
}
