import cloneDeep from 'lodash/cloneDeep';
import each from 'lodash/each';
import reject from 'lodash/reject';
import find from 'lodash/find';
import first from 'lodash/first';
import filter from 'lodash/filter';
import map from 'lodash/map';
import { componentName as orderItemImage } from 'account/orderDetails/components/orderItemImage/component';

/* @ngInject */
export default class AccountOrderMatches {
    constructor(orderService, notificationsService, $uibModal) {
        this.order = cloneDeep(this.data);
        this.orderService = orderService;
        this.$uibModal = $uibModal;
        this.notificationsService = notificationsService;
        this.rejectReasons = orderService.getRejectReasons();
        this.returnReasons = orderService.getReturnReasons();
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
          orderItem.rejectedReasons = this.rejectReasons;
          orderItem.returnedReasons = this.returnReasons;

          if (orderItem.rejected) {
            each(orderItem.rejectedReasons, (val, key) => {
                const f = first(filter(orderItem.rejectReasons, el => {
                    return el === key;
                }));

                if (f) {
                    orderItem.rejectedReasons[key].selected = true;
                }
            });
          }

          if (orderItem.returned) {
            each(orderItem.returnedReasons, (val, key) => {
                const f = first(filter(orderItem.returnReasons, el => {
                    return el === key;
                }));

                if (f) {
                    orderItem.returnedReasons[key].selected = true;
                }
            });
          }

          if (found) {
            found.orderItems.push(orderItem);
          }
        });

        return order;
    }

    rejectOrderItem(orderItem, $event) {
        orderItem.rejected = true;
        const id = orderItem.id;
        let params = '';

        if ($event) {
            const $target = $($event.currentTarget);
            const $orderItem = $target.parents('.order-item');
            const $checked = $orderItem.find('.reject-reason:checked');

            if ($checked.length > 0) {
                params = map($checked, $reason => {
                    return {
                        name: 'rejectReasons',
                        value: $($reason).val()
                    };
                });

                params = $.param(params);
            }
        }

        this.orderService.rejectItem(id, params);
    }

    undoRejectOrderItem(orderItem) {
        orderItem.rejected = false;
        const id = orderItem.id;

        this.orderService.undoRejectItem({ id });
    }

    viewImage(orderItem) {
        const modalInstance = this.$uibModal.open({
            animation: true,
            component: orderItemImage,
            resolve: {
                orderItem: () => orderItem
            }
        });
    }
}
