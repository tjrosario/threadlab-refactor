import angular from 'angular';

const serviceName = 'promo';

/* @ngInject */
class PromoService {
    constructor($http) {
        this.$http = $http;
    }

    list({ config = {}}) {
        return this.$http
            .get(`/promo/list`, config);
    }

    find({ config = {}}) {
        return this.$http
            .get(`/promo/find`, config);
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, PromoService)
    .name;