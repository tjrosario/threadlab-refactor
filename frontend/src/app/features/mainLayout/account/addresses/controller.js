import actionsTemplate from './components/accountAddressesList/cellTemplates/actions.html';

/* @ngInject */
export default class AccountAddresses {
    constructor(customer) {
        this.customer = customer[0].data.data;
    }

    $onInit() {
        
    }

    editAddress(address) {
        
    }

    deleteAddress(address) {

    }
}
