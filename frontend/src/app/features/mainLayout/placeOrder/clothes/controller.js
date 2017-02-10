import cloneDeep from 'lodash/cloneDeep';
import filter from 'lodash/filter';

/* @ngInject */
export default class PlaceOrderClothes {
    constructor(productCategories, notificationsService, currentOrderModel, $state) {
        this.productCategories = productCategories.data.data.productCategorys;
        this.notificationsService = notificationsService;
        this.currentOrderModel = currentOrderModel;
        this.$state = $state;
    }

    $onInit() {
        this.numCategories = this.currentOrderModel.order.box.numCategories;
        this.productCategories = this.prepareData(this.productCategories);
    }

    prepareData(data) {
    	const result = cloneDeep(data);

    	result.list = filter(data, item => {
    		return item.status === 'active';
    	});

    	return result;
    }

    goToPreviousStep() {
        this.$state.go('index.placeOrder.boxSize');
    }
}
