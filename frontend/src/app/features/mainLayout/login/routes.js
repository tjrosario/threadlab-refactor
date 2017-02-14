import template from './view.html';

export default function routes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.login', {
            url: '/login',
            template,
            title: 'Login',
            metaTags: {
                title: 'Sign in to your account'
            },
            resolve: {
                init: function (boxesService) {
                    'ngInject';
                    
                }
            }
        });
}