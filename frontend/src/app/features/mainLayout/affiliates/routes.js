import template from './view.html';

export default function routes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.affiliates', {
            url: '/affiliates',
            template,
            title: 'Affiliates',
            metaTags: {
                title: 'Affiliates'
            },
            resolve: {
                init: function ($q) {
                    'ngInject';
                }
            }
        });
}