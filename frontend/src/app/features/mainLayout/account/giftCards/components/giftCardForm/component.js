import angular from 'angular';

import controller from './controller';
import template from './view.html';

const componentName = 'giftCardForm';
const moduleName = `app.account.giftCards.components.${componentName}`;

const component = {
    controller,
    template,
    bindings: {

    }
};

angular.module(moduleName, [])
    .component(componentName, component);

export { moduleName, componentName };