/* @ngInject */
export default class PlaceOrderBoxSize {
    constructor(boxes, userModel, customerService, currentOrderModel, notificationsService, $state) {
        this.boxes = boxes;
        this.userModel = userModel;
        this.customerService = customerService;
        this.currentOrderModel = currentOrderModel;
        this.notificationsService = notificationsService;
        this.$state = $state;
    }

    $onInit() {
        if (this.userModel.loggedUser.isNewCustomer) {
            const config = {
                params: {
                    startedOrder: true
                }
            };

            this.customerService.updateEntity({ config });
        }
    }

    goToNextStep(box) {
        this.currentOrderModel.order.box = box;
        if (this.userModel.loggedUser.isNewCustomer) {
            const config = {
                params: {
                    selectedBudget: true
                }
            };

            this.customerService.updateEntity({ config })
                .then(resp => {
                    this.$state.go('index.placeOrder.clothes');
                });
        } else {
            this.$state.go('index.placeOrder.clothes');
        }
    }
}
