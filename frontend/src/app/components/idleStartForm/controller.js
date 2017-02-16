import cloneDeep from 'lodash/cloneDeep';

/* @ngInject */
export default class IdleStartForm {
    constructor(CONFIG) {
    	this.appConfig = CONFIG;
    }

    $onInit() {
    	this.countdown = this.appConfig.session.timeout;
    }

    submit() {
    	this.close({$value: ''});
    }

    cancel() {
    	this.dismiss({$value: ''});
    }
}