import template from './view.html';

export default function routes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.login', {
            url: '/login',
            template,
            title: 'Login',
            requireGuest: true,
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