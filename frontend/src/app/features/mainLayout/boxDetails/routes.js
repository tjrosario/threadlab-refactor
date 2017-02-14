import template from './view.html';

import controller from './controller';

export default function routes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.boxDetails', {
            url: '/box/:id',
            template,
            controller,
            controllerAs: '$ctrl',
            title: 'Box',
            metaTags: {
                title: 'Box Details'
            },
            resolve: {
                box: function ($q, $stateParams, boxesService) {
                    'ngInject';
                    const id = $stateParams.id;

                    return boxesService.getEntity({id});
                }
            }
        });
}