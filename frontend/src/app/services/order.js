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

    accept({ id, config = {}}) {
        return this.$http
            .get(`/order/accept/${id}`, config);
    }

    reject({ id, config = {}}) {
        return this.$http
            .get(`/order/reject/${id}`, config);
    }

    confirm({ id, config = {}}) {
        return this.$http
            .get(`/order/confirm/${id}`, config);
    }

    checkout({ id, config = {}}) {
        return this.$http
            .get(`/order/checkout/${id}`, config);
    }

    rejectItem(id, params) {
        return this.$http
            .get(`/order/rejectItem/${id}?${params}`);
    }

    undoRejectItem({ id, config = {}}) {
        return this.$http
            .get(`/order/undoRejectItem/${id}`, config);
    }

    returnItem(id, params) {
        return this.$http
            .get(`/order/returnItem/${id}?${params}`);
    }

    undoReturnItem({ id, config = {}}) {
        return this.$http
            .get(`/order/undoReturnItem/${id}`, config);
    }

    getRejectReasons() {
        return {
            'brand': { text: "Don't like this brand", selected: false },
            'color': { text: 'Color is not for me', selected: false },
            'not-needed': { text: 'Currently own similar item', selected: false },
            'style': { text: 'Style is not for me', selected: false }
        };
    }

    getReturnReasons() {
        return {
            'size-big': { text: 'Too big', selected: false },
            'size-small': { text: 'Too small', selected: false },
            'fit-tight': { text: 'Too tight', selected: false },
            'fit-baggy': { text: 'Too baggy', selected: false },
            'style-general': { text: 'Not my style', selected: false },
            'color-general': { text: 'Not my color', selected: false },
            'condition-damaged': { text: 'Damaged', selected: false }
        };
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, OrderService)
    .name;