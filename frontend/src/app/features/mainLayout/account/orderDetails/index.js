import angular from 'angular';

import routing from './routes';
import { moduleName as orderNextStepsModule } from './components/orderNextStepsModule/component';
import { moduleName as orderPricing } from './components/orderPricing/component';
import { moduleName as orderMatches } from './components/orderMatches/component';
import { moduleName as orderItemImage } from './components/orderItemImage/component';

export default angular.module('app.account.orderDetails', [
    orderNextStepsModule,
    orderPricing,
    orderMatches,
    orderItemImage
])
    .config(routing)
    .name;