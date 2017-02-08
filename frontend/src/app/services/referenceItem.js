import angular from 'angular';

const serviceName = 'referenceItem';

/* @ngInject */
class ReferenceItem {
    constructor($http) {
        this.$http = $http;
    }

    getEntity({ config = {}}) {
        return this.$http
            .get(`/referenceItem/get`, config);
    }

    showEntity({ id, config = {}}) {
        return this.$http
            .get(`/referenceItem/show/${id}`, config);
    }

    createEntity({ config = {}}) {
        return this.$http
            .get('/referenceItem/create', config);
    }

    updateEntity({ id, config = {}}) {
        return this.$http
            .get(`/referenceItem/update/${id}`, config);
    }

    deleteEntity({ id, config = {}}) {
        return this.$http
            .get(`/referenceItem/delete/${id}`, config);
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, ReferenceItem)
    .name;