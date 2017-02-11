import angular from 'angular';

import routing from './routes';

import { moduleName as orderPricing } from 'account/orderDetails/components/orderPricing/component';

export default angular.module('app.placeOrder.confirmation', [
    orderPricing
])
    .config(routing)
    .name;