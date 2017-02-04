import cloneDeep from 'lodash/cloneDeep';
import { componentName as paymentForm } from './components/paymentForm/component';

/* @ngInject */
export default class AccountPaymentSettings {
    constructor(userModel, stripeService, $uibModal, notificationsService) {
        this.userModel = userModel;
        this.stripeService = stripeService;
        this.notificationsService = notificationsService;
        this.$uibModal = $uibModal;
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
        const modalInstance = this.$uibModal.open({
            animation: true,
            component: paymentForm,
            resolve: {
                config: () => ({
                    title: 'Add Card'
                }),
                mode: () => 'add'
            }
        });
    }

    editCard(card) {

    }

    deleteCard(card) {

    }
}
