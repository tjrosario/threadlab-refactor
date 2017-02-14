import template from './view.html';

import controller from './controller';

export default function routes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.contact', {
            url: '/contact',
            template,
            controller,
            controllerAs: '$ctrl',
            title: 'Contact',
            metaTags: {
                title: 'Contact'
            },
            resolve: {
                init: function (boxesService) {
                    'ngInject';
                    
                }
            }
        });
}