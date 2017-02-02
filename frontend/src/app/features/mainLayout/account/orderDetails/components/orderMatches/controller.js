import cloneDeep from 'lodash/cloneDeep';
import each from 'lodash/each';
import reject from 'lodash/reject';
import find from 'lodash/find';

/* @ngInject */
export default class AccountOrderMatches {
    constructor() {
        this.order = cloneDeep(this.data);
    }

    $onInit() {
        this.order = this.prepareOrderData(this.order);
    }

    prepareOrderData(order) {
        order.matches = [];
        order.orderItems = reject(order.orderItems, item => item.rejected && item.rejectedPreviewNumber !== order.previewNumber);

        each(order.productNeeds, (need, i) => {
          order.matches[i] = {};
          order.matches[i].category = need.productCategory.name;
          order.matches[i].orderItems = [];
          order.matches[i].virtualOrderItems = [];
        });

        each(order.orderItems, orderItem => {
          const category = orderItem.product.xProductCategory;
          const found = find(order.matches, { category });

          if (found) {
            found.orderItems.push(orderItem);
          }
        });

        return order;
    }
}
