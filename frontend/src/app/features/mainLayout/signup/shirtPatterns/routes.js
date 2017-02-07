import template from './view.html';
import controller from './controller';
import map from 'lodash/map';

export default function layoutRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('index.signup.shirtPatterns', {
            url: '/shirt-patterns',
            template,
            controller,
            controllerAs: '$ctrl',
            resolve: {
                shirtPatterns: function ($q) {
                    'ngInject';
                }
            }
        });
}
