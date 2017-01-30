import template from './view.html';

export default function routes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.faq', {
            url: '/faq',
            template,
            title: 'FAQ',
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