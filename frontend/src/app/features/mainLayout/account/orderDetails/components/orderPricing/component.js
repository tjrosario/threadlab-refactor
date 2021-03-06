import angular from 'angular';

import template from './view.html';
import controller from './controller';

const componentName = 'orderPricing';
const moduleName = `app.account.orderDetails.components.${componentName}`;

const component = {
    template,
    controller,
    bindings: {
        data: '='
    }
};

angular.module(moduleName, [])
    .component(componentName, component);

export { moduleName, componentName };