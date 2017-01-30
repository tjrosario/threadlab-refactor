import angular from 'angular';

import template from './view.html';

const componentName = 'experienceModule';
const moduleName = `components.${componentName}`;

const component = {
    template,
    bindings: {
        
    }
};

angular.module(moduleName, [])
    .component(componentName, component);

export { moduleName, componentName };