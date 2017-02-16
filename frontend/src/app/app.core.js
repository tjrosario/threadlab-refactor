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
import 'ng-password-strength/dist/scripts/ng-password-strength';
import 'ng-optimizely';
import 'ng-idle';
import 'angulartics';
import 'angulartics-google-tag-manager';
import 'angulartics-facebook-pixel';

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
    'angulartics',
    'angulartics.google.tagmanager',
    'angulartics.facebook.pixel',
    'angularPayments',
    'ui.bootstrap',
    'LocalStorageModule',
    'ng-optimizely',
    'ngIdle',
    uiMask,
	uirouter,
    'ui.router.metatags',
	loadingBar,
	toastr,
    'ngPasswordStrength',

	...featureNames,
	...serviceNames,
    ...modelNames,
    ...filterNames,
    ...directiveNames,
    ...componentNames
]);

export default MODULE_NAME;