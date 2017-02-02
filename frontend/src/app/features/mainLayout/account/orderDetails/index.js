import angular from 'angular';

import routing from './routes';
import { moduleName as orderNextStepsModule } from './components/orderNextStepsModule/component';
import { moduleName as order } from './components/order/component';
import { moduleName as orderPricing } from './components/orderPricing/component';
import { moduleName as orderMatches } from './components/orderMatches/component';

export default angular.module('app.account.orderDetails', [
    orderNextStepsModule,
    order,
    orderPricing,
    orderMatches
])
    .config(routing)
    .name;