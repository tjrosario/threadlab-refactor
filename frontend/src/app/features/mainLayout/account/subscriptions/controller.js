import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import find from 'lodash/find';
import { componentName as subscriptionForm } from './components/subscriptionForm/component';

/* @ngInject */
export default class AccountSubscriptions {
    constructor(customer, $uibModal, subscriptionService, notificationsService) {
        this.customer = customer[0].data.data;
        this.$uibModal = $uibModal;
        this.subscriptionService = subscriptionService;
        this.notificationsService = notificationsService;
    }

    $onInit() {
       this.hasPaymentMethod = Boolean(this.customer.paymentCustomerId);
       this.hasAddress = this.customer.addresses.length > 0;
    }

    addSubscription() {
        const modalInstance = this.$uibModal.open({
            animation: true,
            component: subscriptionForm,
            resolve: {
                config: () => ({
                    title: 'Add Subscription'
                }),
                mode: () => 'add'
            }
        });

        modalInstance.result.then(formData => {
            const config = {
                params: formData
            };

            this.subscriptionService.createEntity({ config })
                .then(resp => {
                    if (resp.data.success) {
                        this.notificationsService.success({ msg: 'Subscription Added' });
                        this.customer.subscriptions.push(resp.data.data);
                    } else {
                        this.notificationsService.alert({ msg: resp.data.message });
                    }
                }, err => {
                    this.notificationsService.alert({ msg: err.message });
                });
        });
    }

    editSubscription(subscription) {
        const modalInstance = this.$uibModal.open({
            animation: true,
            component: subscriptionForm,
            resolve: {
                config: () => ({
                    title: 'Edit Address'
                }),
                subscription: () => subscription,
                mode: () => 'edit'
            }
        });

        modalInstance.result.then(formData => {
            const id = formData.id;

            const config = {
                params: formData
            };

            this.subscriptionService.updateEntity({ id, config })
                .then(resp => {
                    if (resp.data.success) {
                        this.notificationsService.success({ msg: 'Subscription Updated' });
                        this.updateSubscription(formData);
                    } else {
                        this.notificationsService.alert({ msg: resp.data.message });
                    }
                }, err => {
                    this.notificationsService.alert({ msg: err.message });
                });
        });
    }

    deleteSubscription(subscription) {

    }

    updateSubscription(data) {
        const id = data.id;
        const found = find(this.customer.subscriptions, { id });
        merge(found, data);
    }
}
