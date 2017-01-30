import angular from 'angular';

import routing from './routes';
import { moduleName as homepageHero } from './components/homepageHero/component';

export default angular.module('app.home', [
    homepageHero
])
    .config(routing)
    .name;