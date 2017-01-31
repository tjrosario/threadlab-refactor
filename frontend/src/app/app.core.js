import angular from 'angular';
import uirouter from 'angular-ui-router';
import toastr from 'angular-toastr';
import loadingBar from 'angular-loading-bar';
import 'angular-ui-bootstrap';

import 'angular-loading-bar/build/loading-bar.min.css';
import 'angular-toastr/dist/angular-toastr.min.css';

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
    'ui.bootstrap',
	uirouter,
	loadingBar,
	toastr,

	...featureNames,
	...serviceNames,
    ...componentNames
]);

export default MODULE_NAME;