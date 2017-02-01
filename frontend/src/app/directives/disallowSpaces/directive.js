import angular from 'angular';

const directiveName = 'disallowSpaces';

export const disallowSpaces = () => {
    'ngInject';
    return {
        restrict: 'A',
        link: (scope, element) => {
            element.bind('input', function() {
              $(this).val($(this).val().replace(/ /g, ''));
            });
        }
    };
};

export default angular.module(`directives.${directiveName}`, [])
    .directive(directiveName, disallowSpaces)
    .name;
