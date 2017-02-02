import angular from 'angular';

const serviceName = 'order';

/* @ngInject */
class OrderService {
    constructor($http) {
        this.$http = $http;
    }

    findByOrderNumber({config = {}}) {
        return this.$http
            .get(`/order/findByOrderNumber`, config);
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, OrderService)
    .name;