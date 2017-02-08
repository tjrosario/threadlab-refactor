import cloneDeep from 'lodash/cloneDeep';

/* @ngInject */
export default class SubscriptionForm {
    constructor(subscriptionService, $filter) {
    	this.subscription = this.resolve.subscription || {};
        this.subscriptionService = subscriptionService;
        this.$filter = $filter;
    }

    $onInit() {
        this.budgets = this.subscriptionService.getBudgetData();
        this.frequencies = this.subscriptionService.getFrequencyData();
    	this.formData = cloneDeep(this.subscription);

        if (this.resolve.mode === 'edit') {
            this.formData.startDate = new Date(this.formData.startDate);
        }

        this.datePickerPopup = {};

        this.dateOptions = {
            formatYear: 'yy',
            minDate: new Date(),
            startingDay: 1
        };

        this.datePopupFormat = 'dd-MMMM-yyyy';
        this.dateInputFormats = ['M!/d!/yyyy'];
    }

    prepareFormData() {
        const $filter = this.$filter;
    	const formData = cloneDeep(this.formData);
        formData.budget = parseFloat(formData.budget).toFixed(2);
        formData.startDate = `${$filter('date')(formData.startDate, 'MM/dd/yy')} 00:00`;

    	return formData;
    }

    isRequiredFieldsValid() {
        return  this.formData.budget &&
                this.formData.frequency &&
                this.formData.startDate;
    }

    openDatePicker() {
        this.datePickerPopup.opened = true;
    }

    submit() {
    	this.close({$value: this.prepareFormData()});
    }

    cancel() {
    	this.dismiss({$value: ''});
    }
}