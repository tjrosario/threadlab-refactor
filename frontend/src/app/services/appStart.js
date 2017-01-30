import angular from 'angular';

const serviceName = 'appStart';

export class AppStartService {
    constructor($state, $rootScope, CONFIG) {
        'ngInject';
        this.$state = $state;
        this.$rootScope = $rootScope;
        this.$rootScope.assetUrl = CONFIG.assetUrl;
    }

    run() {
        this.$rootScope.$on('$stateChangeStart', this.handleStateChangeStart.bind(this));
        this.$rootScope.$on('$stateChangeSuccess', this.handleStateChangeSuccess.bind(this));
    }

    handleStateChangeSuccess(e, toState) {
        
    }

    handleStateChangeStart(e, toState, toParams, fromState, fromParams) {
        
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, AppStartService)
    .name;