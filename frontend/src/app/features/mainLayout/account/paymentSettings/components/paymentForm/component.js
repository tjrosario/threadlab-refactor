import angular from 'angular';

import controller from './controller';
import template from './view.html';

const componentName = 'paymentForm';
const moduleName = `app.account.paymentSettings.components.${componentName}`;

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