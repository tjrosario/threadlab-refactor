import template from './view.html';
import controller from './controller';
import map from 'lodash/map';

export default function layoutRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.signup.shirtColors', {
            url: '/shirt-colors',
            template,
            controller,
            controllerAs: '$ctrl',
            resolve: {
                shirtColors: function ($q) {
                    'ngInject';
                }
            }
        });
}
