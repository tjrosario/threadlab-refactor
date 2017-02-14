import template from './view.html';

export default function routes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.perfectFit', {
            url: '/perfect-fit',
            template,
            title: 'PerfectFit',
            metaTags: {
                title: 'PerfectFit'
            },
            resolve: {
                init: function ($q) {
                    'ngInject';
                }
            }
        });
}