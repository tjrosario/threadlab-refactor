import cloneDeep from 'lodash/cloneDeep';
import each from 'lodash/each';
import reject from 'lodash/reject';
import find from 'lodash/find';
import first from 'lodash/first';
import filter from 'lodash/filter';
import map from 'lodash/map';
import { componentName as orderItemImage } from 'account/orderDetails/components/orderItemImage/component';
import { componentName as rejectOrderItemForm } from 'account/orderDetails/components/rejectOrderItemForm/component';

import setDelay from 'utils/setDelay';

/* @ngInject */
export default class AccountOrderMatches {
    constructor(orderService, orderItemService, notificationsService, $uibModal, $rootScope) {
        this.order = cloneDeep(this.data);
        this.orderService = orderService;
        this.orderItemService = orderItemService;
        this.$uibModal = $uibModal;
        this.notificationsService = notificationsService;
        this.rejectReasons = orderService.getRejectReasons();
        this.returnReasons = orderService.getReturnReasons();
        this.$rootScope = $rootScope;
    }

    $onInit() {
        this.order = this.prepareOrderData(this.order);
    }

    updatePricing(data) {
        this.orderAmount = data.invoiceValue;
        this.$rootScope.$broadcast('orderPricingUpdated', { data });
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

    updateOrderItem(orderItem) {
        const id = orderItem.id;
        const config = {
            params: {
                comments: orderItem.feedback
            }
        };

        setDelay((() => {
            this.orderItemService.updateEntity({ id, config });
        }), 500);
    }

    rejectOrderItem(orderItem) {
        const modalInstance = this.$uibModal.open({
            animation: true,
            component: rejectOrderItemForm,
            resolve: {
                config: () => ({
                    title: 'Reject Item'
                }),
                rejectReasons: () => this.rejectReasons,
                orderItem: () => orderItem
            }
        });

        modalInstance.result.then(formData => {
            const id = formData.id;
            const params = formData.params || '';
            orderItem.rejected = true;
            
            this.orderService.rejectItem(id, params)
                .then(resp => {
                    if (resp.data.success) {
                        this.updatePricing(resp.data.data);
                    } else {
                        this.notificationsService.alert({ msg: resp.data.message });
                    }
                });
        });
    }

    undoRejectOrderItem(orderItem) {
        orderItem.rejected = false;
        const id = orderItem.id;

        this.orderService.undoRejectItem({ id })
            .then(resp => {
                if (resp.data.success) {
                    this.updatePricing(resp.data.data);
                } else {
                    this.notificationsService.alert({ msg: resp.data.message });
                }
            });
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
