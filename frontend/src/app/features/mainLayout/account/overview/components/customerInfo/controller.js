import cloneDeep from 'lodash/cloneDeep';

/* @ngInject */
export default class CustomerInfo {
    constructor() {
        
    }

    $onInit() {
    	this.data = this.prepareCustomerData(this.data);

        this.datePickerPopup = {};

    	this.dateOptions = {
            dateDisabled: disabled,
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

    openDatePicker() {
    	this.datePickerPopup.opened = true;
    }
}
