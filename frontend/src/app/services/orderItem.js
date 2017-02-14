import angular from 'angular';

const serviceName = 'orderItem';

/* @ngInject */
class OrderItemService {
    constructor($http) {
        this.$http = $http;
    }

    getEntity({ id, config = {}}) {
        return this.$http
            .get(`/orderItem/show/${id}`, config);
    }

    createEntity({ config = {}}) {
        return this.$http
            .get('/orderItem/create', config);
    }

    updateEntity({ id, config = {}}) {
        return this.$http
            .get(`/orderItem/update/${id}`, config);
    }

    deleteEntity({ id, config = {}}) {
        return this.$http
            .get(`/orderItem/delete/${id}`, config);
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, OrderItemService)
    .name;