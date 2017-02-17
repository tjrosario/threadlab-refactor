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
        type: '@',
        pagingText: '@',
        buttonClass: '@',
        nextBtnText: '@',
        prevBtnText: '@',
        onSelect: '&',
        disabledHandler: '&',
        submitBtnText: '@'
    }
};

angular.module(moduleName, [])
    .component(componentName, component);

export { moduleName, componentName };