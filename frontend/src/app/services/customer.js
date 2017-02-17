import angular from 'angular';

const serviceName = 'customer';

/* @ngInject */
class CustomerService {
    constructor($http) {
        this.$http = $http;
    }

    getEntity({ config = {}}) {
        return this.$http
            .get(`/customer/get`, config);
    }

    showEntity({ id, config = {}}) {
        return this.$http
            .get(`/customer/show/${id}`, config);
    }

    createEntity({ config = {}}) {
        return this.$http
            .get('/customer/create', config);
    }

    updateEntity({ config = {}}) {
        return this.$http
            .get(`/customer/update`, config);
    }

    findEntity({ config = {}}) {
        return this.$http
            .get(`/customer/find`, config);
    }

    redeemGiftCard({ config = {}}) {
        return this.$http
            .get(`/customer/redeemGiftCard`, config);
    }

    createOrderFromProductNeeds({ config = {}}) {
        return this.$http
            .get(`/customer/createOrderFromProductNeeds`, config);
    }

    receipt(params = {}) {
        return this.$http
            .post('/customer/receipt', params);
    }

    resetPassword({ id, config = {}}) {
        return this.$http
            .get(`/customer/resetPassword/${id}`, config);
    }

    updatePassword({ config = {}}) {
        return this.$http
            .get(`/customer/updatePassword`, config);
    }

    getLogin({ config = {}}) {
        return this.$http
            .get(`/customer/getLogin`, config);
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, CustomerService)
    .name;