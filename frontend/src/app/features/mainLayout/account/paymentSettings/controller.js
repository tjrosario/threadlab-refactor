import cloneDeep from 'lodash/cloneDeep';
import { componentName as paymentForm } from './components/paymentForm/component';

/* @ngInject */
export default class AccountPaymentSettings {
    constructor(userModel, stripeService, customerService, $uibModal, notificationsService) {
        this.userModel = userModel;
        this.stripeService = stripeService;
        this.customerService = customerService;
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

    isExistingStripeCustomer() {
        return this.customer.paymentCustomerId;
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

        modalInstance.result.then(formData => {
            const paymentCustomerId = this.customer.paymentForm;
            const $form = angular.element('#addCreditCardForm');
            this.formData = formData;
            Stripe.card.createToken($form, (status, resp) => {
                this.onCreateCreditCard(status, resp);
            });
        });
    }

    onCreateCreditCard(status, resp) {
        if (resp.error) {
            this.notificationsService.alert({ msg: resp.error.message });
        } else {

            if (this.isExistingStripeCustomer()) {
                const data = {
                    card: resp.id
                };
                
                this.stripeService.addCard({ customerId: this.customer.paymentCustomerId, data })
                    .then(resp => {
                        const data = resp.data;

                        this.getCards();
                        this.notificationsService.success({ msg: 'Card Added' });
                    });
            } else {
                const data = {
                    card: resp.id,
                    email: this.customer.email
                };

                this.stripeService.createCustomer({ data })
                    .then(resp => {
                        const data = resp.data;
                        if (data.id) {
                            const id = this.customer.id;
                            const config = {
                                params: {
                                    paymentCustomerId: data.id
                                }
                            };
                            this.customer.paymentCustomerId = data.id;
                            this.notificationsService.success({ msg: 'Card Added' });
                            this.customerService.updateEntity({ config })
                                .then(resp => {
                                    this.getCards();
                                });
                        } else {
                            this.notificationsService.alert({ msg: resp.message });
                        }
                    }, err => {
                        this.notificationsService.alert({ msg: err.message });
                    });
            }
        }
    }

    editCard(card) {
        const modalInstance = this.$uibModal.open({
            animation: true,
            component: paymentForm,
            resolve: {
                config: () => ({
                    title: 'Edit Address'
                }),
                card: () => card,
                mode: () => 'edit'
            }
        });
    }

    deleteCard(card) {

    }
}
