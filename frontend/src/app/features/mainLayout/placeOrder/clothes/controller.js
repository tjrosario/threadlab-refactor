import cloneDeep from 'lodash/cloneDeep';
import filter from 'lodash/filter';
import each from 'lodash/each';

/* @ngInject */
export default class PlaceOrderClothes {
    constructor(productCategories, notificationsService, customerService, currentOrderModel, userModel, $state) {
        this.productCategories = productCategories.data.data.productCategorys;
        this.notificationsService = notificationsService;
        this.customerService = customerService;
        this.order = currentOrderModel.order;
        this.box = currentOrderModel.order.box;
        this.userModel = userModel;
        this.$state = $state;
    }

    $onInit() {
        this.numCategories = this.box.numCategories;
        this.productCategories = this.prepareData(this.productCategories);
    }

    prepareData(data) {
    	const result = cloneDeep(data);

    	result.list = filter(data, item => {
    		return item.status === 'active';
    	});

    	return result;
    }

    isRequiredFieldsValid() {
        return  this.productCategories.selected &&
                this.productCategories.selected.length > 0;
    }

    goToPreviousStep() {
        this.$state.go('index.placeOrderBoxSize');
    }

    goToNextStep() {
        const selectedCategories = cloneDeep(this.productCategories.selected);
        const productCategories = [];
        const budget = this.box.price;
        const campaign = this.order.campaign;
        const customer = this.userModel.loggedUser;
        let params = {};

        each(selectedCategories, cat => {
            productCategories.push(cat.code);
        });

        params.productCategories = productCategories.join();
        params.budget = budget;
        params.expand = 'customer,orderItems/item,productNeeds/product';

        if (campaign) {
            params.campaign = campaign;
        }

        params['customer.id'] = customer.id;

        if (this.userModel.loggedUser.isNewCustomer) {
            const config = {
                params: {
                    selectedClothing: true
                }
            };

            this.customerService.updateEntity({ config })
                .then(resp => {
                    this.createOrder(params);
                });
        } else {
            this.createOrder(params);
        }
    }

    createOrder(params) {
        const config = {
            params
        };

        this.customerService.createOrderFromProductNeeds({ config })
            .then(resp => {
                if (resp.data.success) {
                    const order = resp.data.data.order;
                    this.notificationsService.success({ msg: 'Order Created' });
                    this.$state.go('index.placeOrderCheckout', {
                        orderNumber: order.orderNumber
                    });
                } else {
                    this.notificationsService.alert({ msg: resp.data.message });
                }
            }, err => {
                this.notificationsService.alert({ msg: err.message });
            });
    }
}
