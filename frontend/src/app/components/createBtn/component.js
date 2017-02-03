import angular from 'angular';

import template from './view.html';

const componentName = 'createBtn';
const moduleName = `components.${componentName}`;

const component = {
    template,
    bindings: {
    	text: '@'
    }
};

angular.module(moduleName, [])
    .component(componentName, component);

export { moduleName, componentName };