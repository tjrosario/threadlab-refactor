import angular from 'angular';

const serviceName = 'mandrill';

/* @ngInject */
class Mandrill {
    constructor($http, CONFIG) {
        this.$http = $http;
        this.appConfig = CONFIG;
    }

    sendTemplate({ data = {}}) {
        const appConfig = this.appConfig;
        return this.$http
            .post(`${appConfig.mandrill.baseUrl}/sendTemplate`, data);
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, Mandrill)
    .name;