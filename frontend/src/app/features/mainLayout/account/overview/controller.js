/* @ngInject */
export default class AccountOverview {
    constructor(userModel) {
        this.userModel = userModel;
    }

    $onInit() {
    	this.customer = this.userModel.loggedUser;
    }
}
