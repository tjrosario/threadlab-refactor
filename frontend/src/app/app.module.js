import angular from 'angular';
import config from './app.config';
import appCore from './app.core';
import appStartService from './services/appStart';
import { appConfig } from './config/appConfig';

import 'jquery';
import '../assets/styles/app.scss';

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [
        appCore,
        appStartService
    ])
    .constant('CONFIG', appConfig)
    .config(config)
    .run(appStartService => {
        'ngInject';
        appStartService.run();
    });

export default MODULE_NAME;