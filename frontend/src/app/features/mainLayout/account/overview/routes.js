import controller from './controller';
import template from './view.html';

export default function layoutRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.account.index', {
            url: '/account/overview',
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
