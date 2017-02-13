import cloneDeep from 'lodash/cloneDeep';
import map from 'lodash/map';

/* @ngInject */
export default class RejectOrderItemForm {
    constructor() {
    	this.orderItem = this.resolve.orderItem || {};
        this.rejectReasons = this.resolve.rejectReasons;
    }

    $onInit() {
    	
    }

    isRequiredFieldsValid() {
        return  true;
    }

    prepareFormData() {
        const formData = cloneDeep(this.orderItem);

        return formData;
    }

    rejectOrderItem(orderItem, $event) {
        const id = orderItem.id;
        let params = '';
    
        const $target = $($event.currentTarget);
        const $orderItem = $target.parents('.reject-reasons');
        const $checked = $orderItem.find('.reject-reason:checked');

        if ($checked.length > 0) {
            params = map($checked, $reason => {
                return {
                    name: 'rejectReasons',
                    value: $($reason).val()
                };
            });
            params.comments = this.orderItem.comments;
            params = $.param(params);
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