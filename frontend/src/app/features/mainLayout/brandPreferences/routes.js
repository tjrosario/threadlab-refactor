import template from './view.html';

export default function routes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.brandPreferences', {
            url: '/brand-preferences',
            template,
            title: 'Brand Preferences',
            resolve: {
                init: function ($q) {
                    'ngInject';
                }
            }
        });
}