import angular from 'angular';

import routing from './routes';
import Controller from './controller';

export default angular.module('app.mainLayout', [
	
])
    .config(routing)
    .controller('MainLayoutController', Controller)
    .name;