import { httpInterceptors } from './httpInterceptors';
import merge from 'lodash/merge';

export default function appConfig($urlRouterProvider, $locationProvider, $httpProvider, cfpLoadingBarProvider, toastrConfig, $compileProvider, localStorageServiceProvider) {
    'ngInject';

    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
    $httpProvider.interceptors.push(httpInterceptors);
    $compileProvider.debugInfoEnabled(false);
    localStorageServiceProvider.setPrefix('threadlab');
    localStorageServiceProvider.setStorageType('localStorage');

    merge(toastrConfig, {
        autoDismiss: false,
        containerId: 'toast-container',
        maxOpened: 0,
        newestOnTop: true,
        positionClass: 'toast-top-right',
        preventDuplicates: false,
        preventOpenDuplicates: false,
        target: 'body',
        closeButton: true,
        timeOut: 10000,
        progressBar: true
    });
}

