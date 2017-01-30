import template from './view.html';

export default function routes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.home', {
            url: '/',
            template,
            title: 'Homepage',
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