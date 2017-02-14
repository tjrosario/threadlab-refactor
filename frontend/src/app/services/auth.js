import angular from 'angular';

const serviceName = 'auth';

const refreshDuration = 1000 * 60 * 20;

export class AuthService {
    constructor($http, $q, $rootScope, userModel, localStorageService, $timeout, $state) {
        'ngInject';

        this.$http = $http;
        this.$q = $q;
        this.$rootScope = $rootScope;
        this.userModel = userModel;
        this.localStorageService = localStorageService;
        this.$timeout = $timeout;
        this.$state = $state;
    }

    login(params = {}) {
        return this.$http
            .post('/auth/login', params)
            .then(resp => {
                return this.$q.when(resp);
            });
    }

    logout() {
        return this.$http
            .get('/auth/logout')
            .then(resp => {
                return this.$q.when(resp);
            });
    }

    clearTimer() {
        if (this.timer) {
            this.$timeout.cancel(this.timer);
        }
    }

    refreshAfterInterval(refreshInterval) {
        this.clearTimer();

        this.timer = this.$timeout(() => {
            this.refreshData(refreshInterval);
        }, refreshInterval);
    }

    refreshData(refreshInterval) {
        this.checkCurrentUser();
        this.refreshAfterInterval(refreshInterval);
    }

    checkCurrentUser() {
        return this.$http
            .get('/auth/current')
            .then(resp => {
                if (resp.data.success) {
                    this.setCurrentUser(resp.data.data);
                    this.refreshAfterInterval(refreshDuration);
                }

                return this.$q.when(resp);
            });
    }

    setCurrentUser(data) {
        this.userModel.loggedUser = this.$rootScope.currentUser = data;
        this.localStorageService.set('currentUser', JSON.stringify(data));
        this.refreshAfterInterval(refreshDuration);
    }

    clearUser() {
        this.userModel.loggedUser = this.$rootScope.currentUser = false;
        this.localStorageService.remove('currentUser');
        this.clearTimer();
    }

    getCurrentUser() {
        return JSON.parse(this.localStorageService.get('currentUser'));
    }

    resetPassword(email) {
        
    }

    setNewPassword(data) {
        
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, AuthService)
    .name;