import angular from 'angular';

const serviceName = 'customerMeasurement';

/* @ngInject */
class CustomerMeasurement {
    constructor($http) {
        this.$http = $http;
    }

    getEntity({ config = {}}) {
        return this.$http
            .get(`/customerMeasurement/get`, config);
    }

    showEntity({ id, config = {}}) {
        return this.$http
            .get(`/customerMeasurement/show/${id}`, config);
    }

    createEntity({ config = {}}) {
        return this.$http
            .get(`/customerMeasurement/create`, config);
    }

    updateEntity({ id, config = {}}) {
        return this.$http
            .get(`/customerMeasurement/update/${id}`, config);
    }

    deleteEntity({ id, config = {}}) {
        return this.$http
            .get(`/customerMeasurement/delete/${id}`, config);
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, CustomerMeasurement)
    .name;