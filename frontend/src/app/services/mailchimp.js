import angular from 'angular';

const serviceName = 'mailchimp';

/* @ngInject */
class Mailchimp {
    constructor($http, CONFIG) {
        this.$http = $http;
        this.appConfig = CONFIG;
    }

    subscribe({ data = {}}) {
        const appConfig = this.appConfig;
        return this.$http
            .post(`${appConfig.mailchimp.baseUrl}/lists/subscribe`, data);
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, Mailchimp)
    .name;