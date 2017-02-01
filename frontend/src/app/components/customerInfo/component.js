import angular from 'angular';

import template from './view.html';

const componentName = 'customerInfo';
const moduleName = `components.${componentName}`;

const component = {
    template,
    bindings: {
        data: '='
    }
};

angular.module(moduleName, [])
    .component(componentName, component);

export { moduleName, componentName };