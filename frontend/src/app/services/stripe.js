import angular from 'angular';

const serviceName = 'stripe';

/* @ngInject */
class StripeService {
    constructor($http, CONFIG) {
        this.$http = $http;
        this.appConfig = CONFIG;
    }

    getCustomer({ id, config = {}}) {
        const appConfig = this.appConfig;
        return this.$http
            .get(`${appConfig.stripe.baseUrl}/customers/${id}`, config);
    }

    createCustomer({ data = {} }) {
        const appConfig = this.appConfig;
        return this.$http
            .post(`${appConfig.stripe.baseUrl}/customers`, data);
    }

    updateCustomer({ customerId, data = {} }) {
        const appConfig = this.appConfig;
        return this.$http
            .post(`${appConfig.stripe.baseUrl}/customers/${customerId}`, data);
    }

    createToken({ data = {} }) {
        const appConfig = this.appConfig;
        return this.$http
            .post(`${appConfig.stripe.baseUrl}/tokens`, data);
    }

    addCard({ customerId, data = {} }) {
        const appConfig = this.appConfig;
        return this.$http
            .post(`${appConfig.stripe.baseUrl}/customers/${customerId}/sources`, data);
    }

    updateCard({ customerId, cardId, data = {} }) {
        const appConfig = this.appConfig;
        return this.$http
            .post(`${appConfig.stripe.baseUrl}/customers/${customerId}/sources/${cardId}`, data);
    }

    deleteCard({ customerId, cardId, data = {} }) {
        const appConfig = this.appConfig;
        return this.$http
            .delete(`${appConfig.stripe.baseUrl}/customers/${customerId}/sources/${cardId}`, data); 
    }

    addCharge({ data = {} }) {
        const appConfig = this.appConfig;
        return this.$http
            .post(`${appConfig.stripe.baseUrl}/charges`, data);
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, StripeService)
    .name;