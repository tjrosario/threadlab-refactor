import angular from 'angular';

const serviceName = 'auth';

export class AuthService {
    constructor($http, $q, userModel) {
        'ngInject';

        this.$http = $http;
        this.$q = $q;
        this.userModel = userModel;
    }

    login(params = {}) {
        return this.$http
            .post('/auth/login', params)
            .then(res => {
                this.userModel.loggedUser = res.data.data || false;

                return this.$q.when(res);
            });
    }

    logout() {
        return this.$http
            .get('/auth/logout')
            .then(res => {
                this.userModel.loggedUser = false;

                return this.$q.when(res);
            });
    }

    checkCurrentUser() {
        return this.$http
            .get('/auth/current')
            .then(res => {
                this.userModel.loggedUser = res.data.data || false;

                return this.$q.when(res);
            });
    }

    resetPassword(email) {
        
    }

    setNewPassword(data) {
        
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, AuthService)
    .name;