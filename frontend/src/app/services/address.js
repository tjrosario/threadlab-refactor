import angular from 'angular';

const serviceName = 'address';

/* @ngInject */
class AddressService {
    constructor($http) {
        this.$http = $http;
    }

    getEntity({ id, config = {}}) {
        return this.$http
            .get(`/address/show/${id}`, config);
    }

    createEntity({ config = {}}) {
        return this.$http
            .get('/address/create', config);
    }

    updateEntity({ id, config = {}}) {
        return this.$http
            .get(`/address/update/${id}`, config);
    }

    deleteEntity({ id, config = {}}) {
        return this.$http
            .get(`/address/delete/${id}`, config);
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, AddressService)
    .name;