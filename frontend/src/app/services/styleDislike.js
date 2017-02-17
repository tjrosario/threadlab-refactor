import angular from 'angular';

const serviceName = 'styleDislike';

/* @ngInject */
class StyleDislikeService {
    constructor($http) {
        this.$http = $http;
    }

    getEntity({ id, config = {}}) {
        return this.$http
            .get(`/styleDislike/show/${id}`, config);
    }

    createEntity({ config = {}}) {
        return this.$http
            .get('/styleDislike/create', config);
    }

    updateEntity({ id, config = {}}) {
        return this.$http
            .get(`/styleDislike/update/${id}`, config);
    }

    deleteEntity({ id, config = {}}) {
        return this.$http
            .get(`/styleDislike/delete/${id}`, config);
    }
    
    createAllEntities({ data = {}}) {
        return this.$http
            .post(`/styleDislike/createAllJSON`, data);
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, StyleDislikeService)
    .name;