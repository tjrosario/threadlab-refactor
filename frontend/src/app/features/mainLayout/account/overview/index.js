import angular from 'angular';

import routing from './routes';
import { moduleName as customerInfo } from './components/customerInfo/component';

export default angular.module('app.account.overview', [
    customerInfo
])
    .config(routing)
    .name;