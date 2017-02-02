import angular from 'angular';

import template from './view.html';
import controller from './controller';

const componentName = 'order';
const moduleName = `app.account.orderDetails.components.${componentName}`;

const component = {
    template,
    controller,
    controllerAs: '$ctrl',
    bindings: {
        data: '='
    }
};

angular.module(moduleName, [])
    .component(componentName, component);

export { moduleName, componentName };