import angular from 'angular';

import routing from './routes';

import { moduleName as accountAddressesList } from './components/accountAddressesList/component';

export default angular.module('app.account.addresses', [
    accountAddressesList
])
    .config(routing)
    .name;