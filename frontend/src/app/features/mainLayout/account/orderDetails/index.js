import angular from 'angular';

import routing from './routes';
import { moduleName as orderNextStepsModule } from './components/orderNextStepsModule/component';
import { moduleName as orderPricing } from './components/orderPricing/component';
import { moduleName as orderMatches } from './components/orderMatches/component';
import { moduleName as orderItemImage } from './components/orderItemImage/component';
import { moduleName as rejectOrderItemForm } from './components/rejectOrderItemForm/component';
import { moduleName as returnOrderItemForm } from './components/returnOrderItemForm/component';
import { moduleName as addressForm } from 'account/addressSettings/components/addressForm/component';

export default angular.module('app.account.orderDetails', [
    orderNextStepsModule,
    orderPricing,
    orderMatches,
    orderItemImage,
    rejectOrderItemForm,
    returnOrderItemForm,
    addressForm
])
    .config(routing)
    .name;