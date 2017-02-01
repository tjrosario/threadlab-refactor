import angular from 'angular';

import template from './view.html';

const componentName = 'userNavigation';
const moduleName = `components.${componentName}`;

const component = {
    template,
    bindings: {
        items: '<'
    }
};

angular.module(moduleName, [])
    .component(componentName, component);

export { moduleName, componentName };