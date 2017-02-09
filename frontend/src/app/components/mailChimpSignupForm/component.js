import angular from 'angular';

import template from './view.html';
import controller from './controller';

const componentName = 'mailchimpSignupForm';
const moduleName = `components.${componentName}`;

const component = {
    template,
    controller,
    bindings: {
    }
};

angular.module(moduleName, [])
    .component(componentName, component);

export { moduleName, componentName };