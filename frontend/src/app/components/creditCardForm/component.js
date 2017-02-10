import angular from 'angular';

import template from './view.html';

const componentName = 'creditCardForm';
const moduleName = `components.${componentName}`;

const component = {
    template,
    bindings: {
        data: '=',
        mode: '='
    }
};

angular.module(moduleName, [])
    .component(componentName, component);

export { moduleName, componentName };