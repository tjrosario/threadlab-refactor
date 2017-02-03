import angular from 'angular';

import routing from './routes';
import { moduleName as subscriptionsHowItWorksModule } from './components/subscriptionsHowItWorksModule/component';

export default angular.module('app.account.subscriptions', [
    subscriptionsHowItWorksModule
])
    .config(routing)
    .name;