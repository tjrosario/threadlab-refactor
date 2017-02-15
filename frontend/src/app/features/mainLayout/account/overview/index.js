import angular from 'angular';

import routing from './routes';
import { moduleName as customerInfoForm } from './components/customerInfoForm/component';
import { moduleName as resetPasswordForm } from 'resetPassword/components/resetPasswordForm/component';

export default angular.module('app.account.overview', [
    customerInfoForm,
    resetPasswordForm
])
    .config(routing)
    .name;