/* @ngInject */
export default class ExpirationField {
    constructor() {
    	if (this.value) {
    		this.setFieldValues(this.value);
    	}
    }

    updateExpirationFields(e) {
    	const $target = angular.element(e.currentTarget);
    	const value = $target.val();
    	this.setFieldValues(value);
    }

    setFieldValues(value) {
    	const splitVal = value.split('/');
    	this.exp_month = Number(splitVal[0]);
    	this.exp_year = Number(splitVal[1]);
    }
}
