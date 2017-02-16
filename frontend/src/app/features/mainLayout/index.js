import angular from 'angular';

import routing from './routes';
import controller from './controller';

import { moduleName as idleStartForm } from 'components/idleStartForm/component';
import { moduleName as idleTimeoutForm } from 'components/idleTimeoutForm/component';

export default angular.module('app.mainLayout', [
	idleStartForm,
	idleTimeoutForm
])
    .config(routing)
    .controller('MainLayoutController', controller)
    .name;