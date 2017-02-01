import angular from 'angular';

import routing from './routes';
import { moduleName as loginForm } from './components/loginForm/component';

export default angular.module('app.login', [
	loginForm
])
    .config(routing)
    .name;