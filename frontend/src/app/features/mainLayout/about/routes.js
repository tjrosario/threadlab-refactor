import template from './view.html';

export default function routes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.about', {
            url: '/about',
            template,
            title: 'About',
            metaTags: {
                title: 'About'
            },
            resolve: {
                init: function ($q) {
                    'ngInject';
                }
            }
        });
}