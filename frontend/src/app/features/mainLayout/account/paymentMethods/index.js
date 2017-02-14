import angular from 'angular';

import routing from './routes';

import { moduleName as paymentForm } from './components/paymentForm/component';
import { moduleName as genericModal } from 'components/genericModal/component';

export default angular.module('app.account.paymentSettings', [
    paymentForm,
    genericModal
])
    .config(routing)
    .name;