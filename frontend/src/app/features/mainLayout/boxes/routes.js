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
            resolve: {
                init: function ($q) {
                    'ngInject';
                    return $q.all({
                        //customerModelData: customerModel.invalidate().getData({id})
                    });
                }
            }
        });
}