import angular from 'angular';

import controller from './controller';
import template from './view.html';

const componentName = 'profileForm';
const moduleName = `app.signup.components.${componentName}`;

const component = {
    controller,
    template,
    bindings: {

    }
};

angular.module(moduleName, [])
    .component(componentName, component);

export { moduleName, componentName };