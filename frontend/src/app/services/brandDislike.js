import angular from 'angular';

const serviceName = 'brandDislike';

/* @ngInject */
class BrandDislikeService {
    constructor($http) {
        this.$http = $http;
    }

    getEntity({ id, config = {}}) {
        return this.$http
            .get(`/brandDislike/show/${id}`, config);
    }

    createEntity({ config = {}}) {
        return this.$http
            .get('/brandDislike/create', config);
    }

    updateEntity({ id, config = {}}) {
        return this.$http
            .get(`/brandDislike/update/${id}`, config);
    }

    deleteEntity({ id, config = {}}) {
        return this.$http
            .get(`/brandDislike/delete/${id}`, config);
    }
    
    createAllEntities({ data = {}}) {
        return this.$http
            .post(`/brandDislike/createAllJSON`, data);
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, BrandDislikeService)
    .name;