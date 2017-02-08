import angular from 'angular';

import routing from './routes';

import { moduleName as referenceItemForm } from './components/referenceItemForm/component';

export default angular.module('app.account.perfectFit', [
    referenceItemForm
])
    .config(routing)
    .name;