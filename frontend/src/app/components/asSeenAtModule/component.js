import angular from 'angular';

import template from './view.html';

const componentName = 'asSeenAtModule';
const moduleName = `components.${componentName}`;

const component = {
    template,
    bindings: {
        
    }
};

angular.module(moduleName, [])
    .component(componentName, component);

export { moduleName, componentName };