import template from './view.html';
import controller from './controller';

export default function layoutRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.placeOrderBoxSize', {
            url: '/place-order/box-size',
            template,
            controller,
            controllerAs: '$ctrl',
            requireLogin: true,
            resolve: {
                boxes: function (boxesService, authService, $q, $state, $timeout) {
                    'ngInject';

                    const deferred = $q.defer();

                    const currentUser = authService.getCurrentUser();

                    $timeout(() => {
                        if (currentUser.testScenario === 'B') {
                            $state.go('index.placeOrder');
                            deferred.resolve();
                        } else {
                            deferred.resolve(boxesService.getEntities().A);
                        }
                    });

                    return deferred.promise;
                }
            }
        });
}
