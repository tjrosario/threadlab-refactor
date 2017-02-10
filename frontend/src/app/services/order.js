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

    applyPromo({ id, config = {}}) {
        return this.$http
            .get(`/order/applyPromo/${id}`, config);
    }

    finalize({ id, config = {}}) {
        return this.$http
            .get(`/order/finalize/${id}`, config);
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, OrderService)
    .name;