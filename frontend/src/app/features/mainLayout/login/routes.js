import template from './view.html';

export default function routes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.login', {
            url: '/login',
            template,
            title: 'Login',
            resolve: {
                init: function (boxesService) {
                    'ngInject';
                    
                }
            }
        });
}