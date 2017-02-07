import angular from 'angular';
import template from './view.html';

const directiveName = 'toggleBtn';

export const toggleBtn = () => {
    'ngInject';
    return {
        restrict: 'E',
        scope: {
            data: '=',
            label: '=',
            hasMedia: '='
        },
        template,
        controller($rootScope, $scope) {
            $scope.assetUrl = $rootScope.assetUrl;
            if ($scope.label) {
                $scope.buttonClass = $scope.label.replace(/\s+/g, '-').replace(/\//g, '').toLowerCase();
            }

            $scope.check = () => {
                if (!$scope.data.checked) {
                    $scope.data.updated = Date.now();
                }
                $scope.data.checked = !$scope.data.checked;
            };
        }
    };
};

export default angular.module(`directives.${directiveName}`, [])
    .directive(directiveName, toggleBtn)
    .name;