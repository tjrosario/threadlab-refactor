import angular from 'angular';

import template from './view.html';
import controller from './controller';

const componentName = 'paypalForm';
const moduleName = `components.${componentName}`;

const component = {
    template,
    controller,
    bindings: {
        formAction: '@',
        hostedButtonId: '@',
        business: '@',
        amount: '@',
        quantity: '@',
        itemName: '@',
        logoImage: '@',
        return: '@',
        cancelReturn: '@',
        paymentAction: '@',
        custom: '@',
        handler: '&'
    }
};

angular.module(moduleName, [])
    .component(componentName, component);

export { moduleName, componentName };