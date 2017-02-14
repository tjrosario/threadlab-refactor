import template from './view.html';

export default function routes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.home', {
            url: '/',
            template,
            title: 'Homepage',
            metaTags: {
                title: 'Home'
            },
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