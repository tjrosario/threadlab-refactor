import cloneDeep from 'lodash/cloneDeep';
import { componentName as resetPasswordForm } from 'resetPassword/components/resetPasswordForm/component';

/* @ngInject */
export default class CustomerInfoForm {
    constructor(customerService, notificationsService, $filter, $uibModal, authService) {
        this.customerService = customerService;
        this.notificationsService = notificationsService;
        this.$filter = $filter;
        this.$uibModal = $uibModal;
        this.authService = authService;
        this.currentUser = authService.getCurrentUser();
    }

    $onInit() {
    	this.formData = this.prepareCustomerData(this.data);

        this.datePickerPopup = {};

    	this.dateOptions = {
            formatYear: 'yy',
            minDate: new Date(),
            startingDay: 1
    	};

        this.datePopupFormat = 'dd-MMMM-yyyy';
        this.dateInputFormats = ['M!/d!/yyyy'];
    }

    prepareCustomerData(data) {
    	const customer = cloneDeep(data);

    	customer.statedWeight = Number(customer.statedWeight);
        customer.dateOfBirth = new Date(customer.dateOfBirth);

    	return customer;
    }

    isRequiredFieldsValid() {
        return  this.formData.firstName &&
                this.formData.lastName &&
                this.formData.statedHeight &&
                this.formData.statedWeight &&
                this.formData.phone;
    }

    openDatePicker() {
    	this.datePickerPopup.opened = true;
    }

    submit() {
        const $filter = this.$filter;
        const config = {
            params: {
                firstName: this.formData.firstName,
                lastName: this.formData.lastName,
                statedWeight: this.formData.statedWeight,
                statedHeight: this.formData.statedHeight,
                dateOfBirth: `${$filter('date')(this.formData.dateOfBirth, 'MM/dd/yy')} 00:00`,
                phone: this.formData.phone
            }
        };

        this.customerService.updateEntity({ config })
            .then(resp => {
                if (resp.data.success) {
                    this.notificationsService.success({ msg: 'Your Info Has Been Updated' });
                } else {
                    this.notificationsService.alert({ msg: resp.data.message });
                }
            }, err => {
                this.notificationsService.alert({ msg: err.message });
            });
    }

    resetPassword() {
        const modalInstance = this.$uibModal.open({
            animation: true,
            component: resetPasswordForm,
            resolve: {
                config: () => ({
                    title: 'Reset Password'
                })
            }
        });

        modalInstance.result.then(formData => {
            formData.id = this.currentUser.id;

            const config = {
                params: formData
            };

            this.customerService.updatePassword({ config })
                .then(resp => {
                    if (resp.data.success) {
                        this.notificationsService.success({ msg: 'Password successfully changed.' });
                    } else {
                        this.notificationsService.alert({ msg: resp.data.message });
                    }
                }, err => {
                    this.notificationsService.alert({ msg: err.message });
                });
        });
    }
}
