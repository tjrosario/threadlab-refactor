import template from './view.html';

export default function routes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.termsOfUse', {
            url: '/terms',
            template,
            title: 'Terms of Use',
            metaTags: {
                title: 'Terms of Use'
            },
            resolve: {
                init: function ($q) {
                    'ngInject';
                }
            }
        });
}