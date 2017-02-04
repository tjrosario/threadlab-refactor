import angular from 'angular';

import template from './view.html';
import controller from './controller';

const componentName = 'creditCardField';
const moduleName = `components.${componentName}`;

const component = {
    template,
    controller,
    bindings: {
        value: '='
    }
};

angular.module(moduleName, [])
    .component(componentName, component);

export { moduleName, componentName };