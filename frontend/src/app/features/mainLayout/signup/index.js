import angular from 'angular';

import routing from './routes';

import { moduleName as signupStep } from './components/signupStep/component';

export default angular.module('app.signup', [
    signupStep
])
    .config(routing)
    .name;