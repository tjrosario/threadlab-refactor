/* @ngInject */
export default class dataPricing {
    constructor($scope) {
        this.$scope = $scope;
    }

    $onInit() {
        this.$scope.$on('orderPricingUpdated', (event, args) => {
            this.data = args.data;
            this.data.paymentMethod = args.data.paymentMethod || 'stripe';
        });
    }
}