import angular from 'angular';

const serviceName = 'productCategory';

/* @ngInject */
class ProductCategoryService {
    constructor($http) {
        this.$http = $http;
    }

    getEntities({config = {}}) {
        return this.$http
            .get(`/productCategory/list`, config);
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, ProductCategoryService)
    .name;