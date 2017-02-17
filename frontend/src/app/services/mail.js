import angular from 'angular';

const serviceName = 'mail';

/* @ngInject */
class MailService {
    constructor($http) {
        this.$http = $http;
    }
    
    contact({ data = {}}) {
        return this.$http
            .post(`/mail/contact`, data);
    }

    cancelOrder({ data = {}}) {
        return this.$http
            .post(`/mail/cancelOrder`, data);
    }

    feedback({ data = {}}) {
        return this.$http
            .post(`/mail/feedback`, data);
    }

    orderNoMatches({ data = {}}) {
        return this.$http
            .post(`/mail/orderNoMatches`, data);
    }

    orderCategoryNoMatches({ data = {}}) {
        return this.$http
            .post(`/mail/orderCategoryNoMatches`, data);
    }

    ops({ data = {}}) {
        return this.$http
            .post(`/mail/ops`, data);
    }

    fitKit({ data = {}}) {
        return this.$http
            .post(`/mail/fitKit`, data);
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, MailService)
    .name;