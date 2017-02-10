import template from './view.html';
import controller from './controller';

export default function layoutRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.placeOrder', {
            abstract: true,
            url: '/place-order',
            template,
            controller,
            controllerAs: '$ctrl',
            requireLogin: true,
            resolve: {
                init: function () {
                    'ngInject';
                }
            }
        });
}
