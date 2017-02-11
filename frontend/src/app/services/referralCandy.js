import angular from 'angular';

const serviceName = 'referralCandy';

/* @ngInject */
class ReferralCandyService {
    constructor($http, CONFIG) {
        this.$http = $http;
        this.appConfig = CONFIG;
    }

    getSignature({ config = {}}) {
        const appConfig = this.appConfig;
        return this.$http
            .get(`${appConfig.referralCandy.baseUrl}/getSignature`, config);
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, ReferralCandyService)
    .name;