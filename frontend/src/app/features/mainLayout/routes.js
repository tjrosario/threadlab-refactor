import controller from './controller';
import template from './view.html';

export default function layoutRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index', {
            abstract: true,
            url: '',
            template,
            controller,
            controllerAs: '$ctrl',
            resolve: {
                init: function ($q, authService) {
                    'ngInject';
                    
                    return $q.all([
                        authService.checkCurrentUser()
                    ]);
                }
            }
        });
}
