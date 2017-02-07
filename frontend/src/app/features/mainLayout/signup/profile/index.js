import angular from 'angular';

import routing from './routes';

import { moduleName as profileForm } from './components/profileForm/component';

export default angular.module('app.signup.profile', [
    profileForm
])
    .config(routing)
    .name;