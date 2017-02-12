import template from './view.html';
import controller from './controller';
import find from 'lodash/find';

export default function layoutRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.placeOrder', {
            url: '/place-order',
            template,
            controller,
            controllerAs: '$ctrl',
            requireLogin: true,
            resolve: {
                init: function (authService, $state, $q, $timeout, currentOrderModel, boxesService) {
                    'ngInject';

                    const deferred = $q.defer();

                    const currentUser = authService.getCurrentUser();

                    $timeout(() => {
                        if (currentUser.testScenario === 'B') {
                            const price = 99;
                            const theBoxes = boxesService.getEntities().A;
                            const box = find(theBoxes.list, { price });
                            currentOrderModel.order.box = box;
                            $state.go('index.placeOrderClothes');
                        } else {
                            $state.go('index.placeOrderBoxSize');
                        }
                        deferred.resolve();
                    });

                    return deferred.promise;
                }
            }
        });
}
