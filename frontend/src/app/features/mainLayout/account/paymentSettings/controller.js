import cloneDeep from 'lodash/cloneDeep';

/* @ngInject */
export default class AccountPaymentSettings {
    constructor(userModel, stripeService, notificationsService) {
        this.userModel = userModel;
        this.stripeService = stripeService;
        this.notificationsService = notificationsService;
    }

    $onInit() {
    	this.customer = this.userModel.loggedUser;
    	this.getCards();
    }

    getCards() {
    	const id = this.customer.paymentCustomerId;
    	this.stripeService.getCustomer({ id }).then((res) => {
    		const data = res.data;
            
            if (data.error) {
            	this.notificationsService.alert({msg: data.error.message});
            } else {
            	this.cards = data.sources.data;
            }
        }, err => {
            this.notificationsService.alert({msg: err.message});
        });
    }

    addCard() {
    	
    }

    editCard(card) {

    }

    deleteCard(card) {

    }
}
