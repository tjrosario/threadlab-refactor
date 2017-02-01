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

    createEntity({ data = {}, config = {}}) {
        return this.$http
            .post('/customer/create', data, config);
    }

    updateEntity({ data = {}, config = {}}) {
        return this.$http
            .post(`/customer/update`, data, config);
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, CustomerService)
    .name;