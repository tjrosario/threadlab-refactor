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

    redeemGiftCard({ config = {}}) {
        return this.$http
            .get(`/customer/redeemGiftCard`, config);
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, CustomerService)
    .name;