import template from './view.html';
import controller from './controller';

export default function layoutRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.placeOrder', {
            url: '/place-order',
            abstract: true,
            template,
            controller,
            controllerAs: '$ctrl',
            requireLogin: true,
            resolve: {
                init: function (authService, $timeout, $location) {
                    'ngInject';
                }
            }
        });
}
