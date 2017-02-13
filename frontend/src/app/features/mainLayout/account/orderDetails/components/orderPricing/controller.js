/* @ngInject */
export default class OrderPricing {
    constructor($scope) {
        this.$scope = $scope;
    }

    $onInit() {
        this.$scope.$on('orderPricingUpdated', (event, args) => {
		    this.data.budget = args.data.budget;
		    this.data.value = args.data.value;
		    this.data.retailValue = args.data.retailValue;
		    this.data.discount = args.data.discount;
		    this.data.promoCode = args.data.promoCode;
		    this.data.applicableCustomerCredit = args.data.applicableCustomerCredit;
		    this.data.applicableGiftCardCredit = args.data.applicableGiftCardCredit;
		    this.data.appliedCustomerCredit = args.data.appliedCustomerCredit;
		    this.data.appliedGiftCardCredit = args.data.appliedGiftCardCredit;
		    this.data.invoiceValue = args.data.invoiceValue;
		    this.data.customerCreditRefund = args.data.customerCreditRefund;
		    this.data.giftCardCreditRefund = args.data.giftCardCreditRefund;
		    this.data.cashRefund = args.data.cashRefund;
		    this.data.totalRefund = args.data.totalRefund;
		    this.data.paymentAmount = args.data.paymentAmount;
		    this.data.grossPrice = args.data.grossPrice;
		    this.data.netPrice = args.data.netPrice;
            this.data.paymentMethod = args.data.paymentMethod || 'stripe';
        });
    }
}