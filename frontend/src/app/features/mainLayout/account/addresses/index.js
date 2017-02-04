import angular from 'angular';

import routing from './routes';

import { moduleName as addressForm } from './components/addressForm/component';

export default angular.module('app.account.addresses', [
    addressForm
])
    .config(routing)
    .name;