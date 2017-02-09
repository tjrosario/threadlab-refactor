import angular from 'angular';

import template from './view.html';
import controller from './controller';

const componentName = 'gridActions';
const moduleName = `components.${componentName}`;

const component = {
    template,
    controller,
    bindings: {
    	onRead: '&',
        onEdit: '&',
        onDelete: '&',
        deleteTitle: '@',
        deleteText: '@'
    }
};

angular.module(moduleName, [])
    .component(componentName, component);

export { moduleName, componentName };