import cloneDeep from 'lodash/cloneDeep';

/* @ngInject */
export default class AccountPerfectFit {
    constructor(customer, notificationsService) {
        this.customer = customer[0].data.data;
        this.notificationsService = notificationsService;
    }

    $onInit() {
    }

    addReferenceItem() {
    	
    }

    editReferenceItem(referenceItem) {

    }

    deleteReferenceItem(referenceItem) {

    }
}
