import find from 'lodash/find';
import merge from 'lodash/merge';
import remove from 'lodash/remove';
import { componentName as addressForm } from './components/addressForm/component';
import { componentName as genericModal } from 'components/genericModal/component';

/* @ngInject */
export default class AccountAddresses {
    constructor(customer, $uibModal, addressService, notificationsService) {
        this.customer = customer[0].data.data;
        this.$uibModal = $uibModal;
        this.addressService = addressService;
        this.notificationsService = notificationsService;
    }

    $onInit() {
        
    }

    addAddress() {
        const modalInstance = this.$uibModal.open({
            animation: true,
            component: addressForm,
            resolve: {
                config: () => ({
                    title: 'Add Address'
                }),
                mode: () => 'add'
            }
        });

        modalInstance.result.then(formData => {
            formData['customer.id'] = this.customer.id;

            const config = {
                params: formData
            };

            this.addressService.createEntity({ config })
                .then(resp => {
                    if (resp.data.success) {
                        this.notificationsService.success({ msg: 'Address Added' });
                        this.customer.addresses.push(resp.data.data);
                    } else {
                        this.notificationsService.alert({ msg: resp.data.message });
                    }
                }, err => {
                    this.notificationsService.alert({ msg: err.message });
                });
        });    
    }

    updateAddress(data) {
        const id = data.id;
        const found = find(this.customer.addresses, { id });
        merge(found, data);
    }

    editAddress(address) {
        const modalInstance = this.$uibModal.open({
            animation: true,
            component: addressForm,
            resolve: {
                config: () => ({
                    title: 'Edit Address'
                }),
                address: () => address,
                mode: () => 'edit'
            }
        });

        modalInstance.result.then(formData => {
            const id = formData.id;

            const config = {
                params: formData
            };

            this.addressService.updateEntity({ id, config })
                .then(resp => {
                    if (resp.data.success) {
                        this.notificationsService.success({ msg: 'Address Updated' });
                        this.updateAddress(formData);
                    } else {
                        this.notificationsService.alert({ msg: resp.data.message });
                    }
                }, err => {
                    this.notificationsService.alert({ msg: err.message });
                });
        });
    }

    deleteAddress(address) {
        const id = address.id;

        if (this.customer.addresses.length === 1) {
            const modalInstance = this.$uibModal.open({
                animation: true,
                component: genericModal,
                resolve: {
                    title: () => 'Cannot Delete Address',
                    text: () => 'You must have at least one address on file',
                    confirmButtonLabel: () => 'OK'
                }
            });
        } else {
            this.addressService.deleteEntity({ id })
                .then(resp => {
                    if (resp.data.success) {
                        this.notificationsService.success({ msg: 'Address Deleted' });
                        remove(this.customer.addresses, item => {
                            return item.id === id;
                        });
                    } else {
                        this.notificationsService.alert({ msg: resp.data.message });
                    }
                }, err => {
                    this.notificationsService.alert({ msg: err.message });
                });
        }
    }
}
