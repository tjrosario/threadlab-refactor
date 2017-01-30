import template from './view.html';

export default function routes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.howItWorks', {
            url: '/how-it-works',
            template,
            title: 'How it Works',
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