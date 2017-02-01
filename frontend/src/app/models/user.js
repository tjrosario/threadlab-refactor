import _ from 'lodash';
import angular from 'angular';

const modelName = 'user';

export class UserModel {
    constructor($q) {
        'ngInject';

        this.loggedUser = false;
    }

    getLoggedUser() {
        return this.loggedUser;
    }
}

export default angular.module(`models.${modelName}`, [])
    .service(`${modelName}Model`, UserModel)
    .name;
