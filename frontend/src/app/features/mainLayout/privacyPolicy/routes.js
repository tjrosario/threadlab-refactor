import template from './view.html';

export default function routes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.privacyPolicy', {
            url: '/privacy',
            template,
            title: 'Privacy Policy',
            resolve: {
                init: function ($q) {
                    'ngInject';
                }
            }
        });
}