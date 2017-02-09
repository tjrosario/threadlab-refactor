import angular from 'angular';

const serviceName = 'measurementPreference';

/* @ngInject */
class MeasurementPreferenceService {
    constructor($http) {
        this.$http = $http;
    }

    getEntity({ id, config = {}}) {
        return this.$http
            .get(`/measurementPreference/show/${id}`, config);
    }

    createEntity({ config = {}}) {
        return this.$http
            .get('/measurementPreference/create', config);
    }

    updateEntity({ id, config = {}}) {
        return this.$http
            .get(`/measurementPreference/update/${id}`, config);
    }

    deleteEntity({ id, config = {}}) {
        return this.$http
            .get(`/measurementPreference/delete/${id}`, config);
    }
    
    createAllEntities({ params = {}}) {
        return this.$http
            .post(`/measurementPreference/createAllJSON`, params);
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, MeasurementPreferenceService)
    .name;