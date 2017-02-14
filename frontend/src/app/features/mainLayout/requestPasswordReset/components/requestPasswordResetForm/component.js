import angular from 'angular';

import controller from './controller';
import template from './view.html';

const componentName = 'requestPasswordResetForm';
const moduleName = `app.requestPasswordReset.components.${componentName}`;

const component = {
    controller,
    template,
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    }
};

angular.module(moduleName, [])
    .component(componentName, component);

export { moduleName, componentName };