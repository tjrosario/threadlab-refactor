import angular from 'angular';

import controller from './controller';
import template from './view.html';
import service from './service';

const componentName = 'homepageHero';
const moduleName = `app.home.components.${componentName}`;

const component = {
    controller,
    template,
    bindings: {}
};

angular.module(moduleName, [])
    .component(componentName, component)
    .service(`${componentName}DomainService`, service);

export { moduleName, componentName };
