import angular from 'angular';
import template from './view.html';
import first from 'lodash/first';
import sortBy from 'lodash/sortBy';

const directiveName = 'checkboxList';

export const checkboxList = () => {
    'ngInject';
    return {
        restrict: 'E',
        scope: {
            data: '=',
            labelField: '@',
            limit: '@',
            type: '@',
            hasMedia: '@'
        },
        template,
        controller($scope) {
            $scope.$watch('data.list|filter:{checked:true}', checked => {
                let sorted;
                if ($scope.data !== null) {
                    $scope.data.selected = $scope.limit !== null ? (sorted = sortBy(checked, 'updated'), sorted.length > $scope.limit ? first(sorted).checked = false : void 0, sorted) : checked;
                }
            }, true);
        }
    };
};

export default angular.module(`directives.${directiveName}`, [])
    .directive(directiveName, checkboxList)
    .name;