import angular from 'angular';

import routing from './routes';
import { moduleName as subscriptionsHowItWorksModule } from './components/subscriptionsHowItWorksModule/component';
import { moduleName as subscriptionForm } from './components/subscriptionForm/component';

export default angular.module('app.account.subscriptions', [
    subscriptionsHowItWorksModule,
    subscriptionForm
])
    .config(routing)
    .name;