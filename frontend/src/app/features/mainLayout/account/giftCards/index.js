import angular from 'angular';

import routing from './routes';

import { moduleName as giftCardForm } from './components/giftCardForm/component';

export default angular.module('app.account.addresses', [
    giftCardForm
])
    .config(routing)
    .name;