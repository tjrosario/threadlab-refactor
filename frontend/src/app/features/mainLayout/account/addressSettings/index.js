import angular from 'angular';

import routing from './routes';

import { moduleName as addressForm } from './components/addressForm/component';
import { moduleName as genericModal } from 'components/genericModal/component';

export default angular.module('app.account.addressSettings', [
    addressForm,
    genericModal
])
    .config(routing)
    .name;