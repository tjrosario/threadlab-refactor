import angular from 'angular';

import template from './view.html';

const componentName = 'gridActions';
const moduleName = `components.${componentName}`;

const component = {
    template,
    bindings: {
        onEdit: '&',
        onDelete: '&'
    }
};

angular.module(moduleName, [])
    .component(componentName, component);

export { moduleName, componentName };