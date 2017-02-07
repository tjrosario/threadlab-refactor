import angular from 'angular';

const serviceName = 'size';

/* @ngInject */
class CustomerService {
    constructor($http) {
        this.$http = $http;
    }

    findAll({ config = {} }) {
        return this.$http
            .get(`/size/findAll`, config); 
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, CustomerService)
    .name;