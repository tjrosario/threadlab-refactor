import angular from 'angular';

const serviceName = 'facebook';

/* @ngInject */
class FacebookService {
    constructor($timeout) {
        this.$timeout = $timeout;
    }

    trackPixel(event, action, opts) {
        opts = opts || void 0;
        this.$timeout(() => {
        	if (window.fbq) {
        		if (opts) {
        			fbq(event, action, opts);
        		} else {
        			fbq(event, action);
        		}
        	}
        });
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, FacebookService)
    .name;