import _ from 'lodash';
import angular from 'angular';

const modelName = 'currentOrder';

export class CurrentOrderModel {
    constructor() {
        'ngInject';

        this.order = {};
    }
}

export default angular.module(`models.${modelName}`, [])
    .service(`${modelName}Model`, CurrentOrderModel)
    .name;
