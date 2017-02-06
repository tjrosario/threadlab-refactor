import cloneDeep from 'lodash/cloneDeep';

/* @ngInject */
export default class GiftCardForm {
    constructor(customerService, notificationsService, $rootScope) {
        this.customerService = customerService;
        this.notificationsService = notificationsService;
        this.formData = {};
        this.$rootScope = $rootScope;
    }

    $onInit() {

    }

    isRequiredFieldsValid() {
        return  this.formData.code !== undefined;
    }

    getCustomerCredits() {
        this.customerService.getEntity({})
            .then(resp => {
                if (resp.data.success) {
                    this.$rootScope.currentUser.giftCardCreditAmount = resp.data.data.giftCardCreditAmount;
                }
            });
    }

    submit(form) {
        const config = {
            params: this.formData
        };

        this.customerService.redeemGiftCard({ config })
            .then(resp => {
                if (resp.data.success) {
                    this.notificationsService.success({ msg: 'Gift Card Redeemed' });
                    this.getCustomerCredits();
                } else {
                    this.notificationsService.alert({ msg: resp.data.message });
                }
            }, err => {
                this.notificationsService.alert({ msg: err.message });
            });
    }
}