import angular from 'angular';

import template from './view.html';
import controller from './controller';

const componentName = 'boxSelectionModule';
const moduleName = `components.${componentName}`;

const component = {
    template,
    controller,
    controllerAs: '$ctrl',
    bindings: {
        
    }
};

angular.module(moduleName, [])
    .component(componentName, component);

export { moduleName, componentName };