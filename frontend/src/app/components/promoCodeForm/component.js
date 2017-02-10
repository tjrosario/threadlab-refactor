import angular from 'angular';

import template from './view.html';
import controller from './controller';

const componentName = 'promoCodeForm';
const moduleName = `components.${componentName}`;

const component = {
    template,
    controller,
    bindings: {
    	data: '=',
        handler: '&'
    }
};

angular.module(moduleName, [])
    .component(componentName, component);

export { moduleName, componentName };