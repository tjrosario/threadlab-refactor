import angular from 'angular';

import routing from './routes';
import controller from './controller';

export default angular.module('app.mainLayout', [
	
])
    .config(routing)
    .controller('MainLayoutController', controller)
    .name;