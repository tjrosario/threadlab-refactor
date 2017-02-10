import template from './view.html';
import controller from './controller'

export default function layoutRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.placeOrder.boxSize', {
            url: '/box-size',
            template,
            controller,
            controllerAs: '$ctrl',
            requireLogin: true,
            resolve: {
                boxes: function (boxesService) {
                    'ngInject';
                    return boxesService.getEntities().A;
                }
            }
        });
}
