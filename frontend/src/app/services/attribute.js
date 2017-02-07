import angular from 'angular';

const serviceName = 'attribute';

/* @ngInject */
class AttributeService {
    constructor($http) {
        this.$http = $http;
    }

    findAll({ config = {} }) {
        return this.$http
            .get(`/attribute/findAll`, config); 
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, AttributeService)
    .name;