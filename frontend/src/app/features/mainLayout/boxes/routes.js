import template from './view.html';

import controller from './controller';

export default function routes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.boxes', {
            url: '/boxes',
            template,
            controller,
            controllerAs: '$ctrl',
            title: 'Which Box Are You?',
            metaTags: {
                title: 'Which Box Are You?'
            },
            resolve: {
                boxes: function (boxesService) {
                    'ngInject';
                    return boxesService.getEntities().A;
                }
            }
        });
}