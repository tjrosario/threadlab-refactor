import angular from 'angular';
import uirouter from 'angular-ui-router';
import toastr from 'angular-toastr';
import loadingBar from 'angular-loading-bar';
import 'angular-ui-bootstrap';
import 'angular-ui-grid';
import 'angular-payments';
import uiMask from 'angular-ui-mask';
import 'angular-local-storage';
import 'ui-router-metatags/dist/ui-router-metatags';

import 'angular-loading-bar/build/loading-bar.min.css';
import 'angular-toastr/dist/angular-toastr.min.css';

import {
    featureNames,
    serviceNames,
    modelNames,
    filterNames,
    directiveNames,
    componentNames
} from './autoloader';

const MODULE_NAME = 'app.core';

angular.module(MODULE_NAME, [
    'angularPayments',
    'ui.bootstrap',
    'LocalStorageModule',
    uiMask,
	uirouter,
    'ui.router.metatags',
	loadingBar,
	toastr,

	...featureNames,
	...serviceNames,
    ...modelNames,
    ...filterNames,
    ...directiveNames,
    ...componentNames
]);

export default MODULE_NAME;