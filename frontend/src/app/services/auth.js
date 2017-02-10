import angular from 'angular';

const serviceName = 'auth';

export class AuthService {
    constructor($http, $q, $rootScope, userModel, localStorageService, $timeout) {
        'ngInject';

        this.$http = $http;
        this.$q = $q;
        this.$rootScope = $rootScope;
        this.userModel = userModel;
        this.localStorageService = localStorageService;
        this.$timeout = $timeout;
    }

    login(params = {}) {
        return this.$http
            .post('/auth/login', params)
            .then(resp => {
                this.setCurrentUser(resp.data.data);

                return this.$q.when(resp);
            });
    }

    logout() {
        return this.$http
            .get('/auth/logout')
            .then(resp => {
                this.userModel.loggedUser = this.$rootScope.currentUser = false;
                this.localStorageService.remove('currentUser');

                return this.$q.when(resp);
            });
    }

    checkCurrentUser() {
        const deferred = this.$q.defer();

        const currentUser = this.getCurrentUser();

        this.$timeout(() => {
            if (currentUser) {
                this.setCurrentUser(currentUser);
                deferred.resolve(currentUser);
            } else {
                deferred.resolve({});
            }
        });

        return deferred.promise;

        /*
        return this.$http
            .get('/auth/current')
            .then(res => {
                this.userModel.loggedUser = this.$rootScope.currentUser = res.data.data || false;
                this.localStorageService.set('currentUser', JSON.stringify(res.data.data));

                return this.$q.when(res);
            }); */
    }

    setCurrentUser(data) {
        this.userModel.loggedUser = this.$rootScope.currentUser = data;
        this.localStorageService.set('currentUser', JSON.stringify(data));
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