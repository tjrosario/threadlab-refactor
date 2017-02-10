import angular from 'angular';
import _ from 'lodash';

const serviceName = 'appStart';

export class AppStartService {
    constructor($state, $rootScope, $anchorScroll, CONFIG, userModel) {
        'ngInject';
        this.$state = $state;
        this.$rootScope = $rootScope;
        this.$anchorScroll = $anchorScroll;
        this.$rootScope.assetUrl = CONFIG.assetUrl;
        this.userModel = userModel;
    }

    run() {
        this.$rootScope.$on('$stateChangeStart', this.handleStateChangeStart.bind(this));
        this.$rootScope.$on('$stateChangeSuccess', this.handleStateChangeSuccess.bind(this));
    }

    isAuthenticated() {
        return this.userModel.loggedUser;
    }

    handleStateChangeSuccess(e, toState) {
        this.$anchorScroll();
    }

    handleStateChangeStart(e, toState, toParams, fromState, fromParams) {
        //this.handleRedirections(e, toState, fromState);
    }

    handleRedirections(e, toState, fromState) {
        const redirectionHandlers = [
            {
                condition: toState.requireLogin && !this.isAuthenticated(),
                route: 'index.login'
            },
            {
                condition: !toState.requireLogin && this.isAuthenticated(),
                route: 'index.home'
            },
            {
                condition: toState.redirectTo,
                route: toState.redirectTo
            }
        ];

        _.each(redirectionHandlers, handler => {
            this.handleRedirection(handler, e, fromState);
        });
    }

    handleRedirection(handler, e, fromState) {
        if (handler.condition) {
            e.preventDefault();

            if (handler.route) {
                this.$state.go(handler.route);
            }

            if (handler.back) {
                if (fromState.name) {
                    this.$state.go(fromState.name);
                } else {
                    this.$state.go('index.home');
                }
            }

            if (handler.callback) {
                handler.callback();
            }
        }
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, AppStartService)
    .name;