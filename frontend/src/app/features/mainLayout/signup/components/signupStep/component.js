import angular from 'angular';

import controller from './controller';
import template from './view.html';

const componentName = 'signupStep';
const moduleName = `app.signup.components.${componentName}`;

const component = {
    controller,
    template,
    bindings: {
    	data: '=',
        limit: '@',
        section: '@',
        headline: '@',
        text: '@',
        pagingText: '@',
        buttonClass: '@',
        nextBtnText: '@',
        prevBtnText: '@',
        onSelect: '&'
    }
};

angular.module(moduleName, [])
    .component(componentName, component);

export { moduleName, componentName };