import angular from 'angular';

import routing from './routes';

export default angular.module('app.signup.profile', [
    profileForm
])
    .config(routing)
    .name;