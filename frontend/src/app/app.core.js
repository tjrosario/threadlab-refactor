import angular from 'angular';
import uirouter from 'angular-ui-router';
import toastr from 'angular-toastr';
import loadingBar from 'angular-loading-bar';

import {
    featureNames,
    serviceNames,
    //modelNames,
    //filterNames,
    //directiveNames,
    componentNames
} from './autoloader';

const MODULE_NAME = 'app.core';

angular.module(MODULE_NAME, [
	uirouter,
	loadingBar,
	toastr,

	...featureNames,
	...serviceNames,
    ...componentNames
]);

export default MODULE_NAME;