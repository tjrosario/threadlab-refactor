import template from './view.html';

export default function routes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.faq', {
            url: '/faq',
            template,
            title: 'FAQ',
            metaTags: {
                title: 'FAQ'
            },
            resolve: {
                init: function ($q) {
                    'ngInject';
                }
            }
        });
}