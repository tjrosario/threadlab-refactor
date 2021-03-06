import cloneDeep from 'lodash/cloneDeep';
import { componentName as paymentForm } from './components/paymentForm/component';
import { componentName as genericModal } from 'components/genericModal/component';

/* @ngInject */
export default class AccountPaymentSettings {
    constructor(userModel, stripeService, customerService, $uibModal, notificationsService, authService) {
        this.userModel = userModel;
        this.stripeService = stripeService;
        this.customerService = customerService;
        this.notificationsService = notificationsService;
        this.$uibModal = $uibModal;
        this.authService = authService;
    }

    $onInit() {
        this.customer = this.userModel.loggedUser;
        this.getCards();
    }

    getCards() {
        const id = this.customer.paymentCustomerId;

        if (id) {
            this.stripeService.getCustomer({ id }).then((res) => {
                const data = res.data;
                
                if (data.error) {
                    const msg = data.error.message;
                    this.notificationsService.alert({msg});

                    if (msg.indexOf('similar object exists in live mode') > -1) {
                        this.clearPaymentId();
                    }
                } else {
                    this.cards = data.sources.data;
                }
            }, err => {
                this.notificationsService.alert({msg: err.message});
            });
        }
    }

    clearPaymentId() {
        const config = {
            params: {
                paymentCustomerId: ''
            }
        };

        this.customerService.updateEntity({ config })
            .then(resp => {
                if (resp.data.success) {
                    this.notificationsService.success({ msg: 'Payment ID Cleared.  Add a new payment method to generate a new ID' });
                    this.authService.setCurrentUser(resp.data.data);
                } else {
                    this.notificationsService.alert({ msg: 'Unable to clear Payment ID.  Please try again' });
                }
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
                    title: 'Add Payment Method'
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
                        this.notificationsService.success({ msg: 'Payment Method Added' });
                    });
            } else {
                const data = {
                    card: resp.id,
                    email: this.customer.email
                };

                this.stripeService.createCustomer({ data })
                    .then(resp => {
                        if (resp.data.error) {
                            this.notificationsService.alert({ msg: resp.data.error.message });
                        } else {
                            const data = resp.data;
                        
                            const config = {
                                params: {
                                    paymentCustomerId: data.id
                                }
                            };
                            
                            this.customer.paymentCustomerId = data.id;
                            this.notificationsService.success({ msg: 'Payment Method Added' });
                            this.customerService.updateEntity({ config })
                                .then(resp => {
                                    this.authService.setCurrentUser(resp.data.data);
                                    this.getCards();
                                });
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
                    title: 'Edit Payment Method'
                }),
                card: () => card,
                mode: () => 'edit'
            }
        });

        modalInstance.result.then(formData => {
            const customerId = card.customer;
            const cardId = formData.id;
            const data = {
                name: formData.name,
                exp_month: formData.exp_month,
                exp_year: formData.exp_year,
                address_zip: formData.address_zip
            };

            this.stripeService.updateCard({ customerId, cardId, data })
                .then(resp => {
                    const data = resp.data;
                    if (data.id) {
                        this.notificationsService.success({ msg: 'Payment Method Updated' });
                        this.getCards();
                    } else {
                        this.notificationsService.alert({ msg: resp.message });
                    }
                }, err => {
                    this.notificationsService.alert({ msg: err.message });
                });
        });
    }

    deleteCard(card) {
        const customerId = card.customer;
        const cardId = card.id;

        if (this.cards.length === 1) {
            const modalInstance = this.$uibModal.open({
                animation: true,
                component: genericModal,
                resolve: {
                    title: () => 'Cannot Delete Payment Method',
                    text: () => 'You must have at least one card on file',
                    confirmButtonLabel: () => 'OK'
                }
            });
        } else {
            this.stripeService.deleteCard({ customerId, cardId })
                .then(resp => {
                    const data = resp.data;
                    if (data.id) {
                        this.notificationsService.success({ msg: 'Payment Method Deleted' });
                        this.getCards();
                    } else {
                        this.notificationsService.alert({ msg: resp.message });
                    }
                }, err => {
                    this.notificationsService.alert({ msg: err.message });
                });
        }
    }
}
