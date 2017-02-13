import angular from 'angular';

import controller from './controller';
import template from './view.html';

const componentName = 'rejectOrderItemForm';
const moduleName = `app.account.orderDetails.components.${componentName}`;

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