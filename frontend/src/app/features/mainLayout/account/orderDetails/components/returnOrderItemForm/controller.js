import cloneDeep from 'lodash/cloneDeep';
import map from 'lodash/map';

/* @ngInject */
export default class ReturnOrderItemForm {
    constructor() {
    	this.orderItem = this.resolve.orderItem || {};
        this.returnReasons = this.resolve.returnReasons;
    }

    $onInit() {
    	this.orderItem.params = [];
    }

    isRequiredFieldsValid() {
        return  true;
    }

    prepareFormData() {
        const formData = cloneDeep(this.orderItem);
        if (formData.params.length > 0) {
            formData.params = $.param(formData.params);
            formData.params += '&comments=' + this.orderItem.comments;
        } else {
            formData.params += '?comments=' + this.orderItem.comments;
        }
        
        return formData;
    }

    returnOrderItem(orderItem, $event) {
        const id = orderItem.id;
        let params = '';
    
        const $target = $($event.currentTarget);
        const $orderItem = $target.parents('.return-reasons');
        const $checked = $orderItem.find('.return-reason:checked');

        if ($checked.length > 0) {
            params = map($checked, $reason => {
                return {
                    name: 'returnReasons',
                    value: $($reason).val()
                };
            });
            this.orderItem.params = params;
        }
    }

    submit() {
    	this.close({$value: this.prepareFormData()});
    }

    cancel() {
    	this.dismiss({$value: ''});
    }
}