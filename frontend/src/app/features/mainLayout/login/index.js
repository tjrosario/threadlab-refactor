import angular from 'angular';

import routing from './routes';
import { moduleName as loginForm } from './components/loginForm/component';
import { moduleName as requestPasswordResetForm } from 'requestPasswordReset/components/requestPasswordResetForm/component';

export default angular.module('app.login', [
	loginForm,
	requestPasswordResetForm
])
    .config(routing)
    .name;