import angular from 'angular';

const serviceName = 'brand';

/* @ngInject */
class BrandService {
    constructor($http) {
        this.$http = $http;
    }

    getEntities({config = {}}) {
        return this.$http
            .get(`/brand/list`, config);
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, BrandService)
    .name;