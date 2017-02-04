import angular from 'angular';

import routing from './routes';

import { moduleName as paymentForm } from './components/paymentForm/component';

export default angular.module('app.account.paymentSettings', [
    paymentForm
])
    .config(routing)
    .name;