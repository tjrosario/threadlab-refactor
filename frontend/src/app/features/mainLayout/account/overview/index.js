import angular from 'angular';

import routing from './routes';
import { moduleName as customerInfoForm } from './components/customerInfoForm/component';

export default angular.module('app.account.overview', [
    customerInfoForm
])
    .config(routing)
    .name;