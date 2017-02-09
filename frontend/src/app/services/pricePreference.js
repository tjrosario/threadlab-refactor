import angular from 'angular';

const serviceName = 'pricePreference';

/* @ngInject */
class PricePreferenceService {
    constructor($http) {
        this.$http = $http;
    }

    getEntity({ id, config = {}}) {
        return this.$http
            .get(`/pricePreference/show/${id}`, config);
    }

    createEntity({ config = {}}) {
        return this.$http
            .get('/pricePreference/create', config);
    }

    updateEntity({ id, config = {}}) {
        return this.$http
            .get(`/pricePreference/update/${id}`, config);
    }

    deleteEntity({ id, config = {}}) {
        return this.$http
            .get(`/pricePreference/delete/${id}`, config);
    }
    
    createAllEntities({ params = {}}) {
        return this.$http
            .post(`/pricePreference/createAllJSON`, params);
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, PricePreferenceService)
    .name;