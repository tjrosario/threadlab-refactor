import angular from 'angular';

import template from './view.html';
import controller from './controller';

const componentName = 'genericModal';
const moduleName = `app.components.${componentName}`;

const component = {
    template,
    controller,
    bindings: {
        resolve: '<',
        submit: '&',
        cancel: '&'
    }
};

angular.module(moduleName, [])
    .component(componentName, component);

export { moduleName, componentName };