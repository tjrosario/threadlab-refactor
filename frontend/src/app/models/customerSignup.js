import _ from 'lodash';
import angular from 'angular';

const modelName = 'customerSignup';

export class CustomerSignupModel {
    constructor() {
        'ngInject';

        this.user = {};
    }
}

export default angular.module(`models.${modelName}`, [])
    .service(`${modelName}Model`, CustomerSignupModel)
    .name;
