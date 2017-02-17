import angular from 'angular';

const serviceName = 'priceRange';

/* @ngInject */
class PriceRangeService {
    constructor($http) {
        this.$http = $http;
    }

    findAll({ config = {} }) {
        return this.$http
            .get(`/priceRange/findAll`, config); 
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, PriceRangeService)
    .name;