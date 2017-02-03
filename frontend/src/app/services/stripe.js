import angular from 'angular';

const serviceName = 'stripe';

/* @ngInject */
class StripeService {
    constructor($http, CONFIG) {
        this.$http = $http;
        this.appConfig = CONFIG;
    }

    getCustomer({id, config = {}}) {
        const appConfig = this.appConfig;
        return this.$http
            .get(`${appConfig.stripe.baseUrl}/customers/${id}`, config);
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, StripeService)
    .name;