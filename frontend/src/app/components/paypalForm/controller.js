/* @ngInject */
export default class PaypalForm {
    constructor(CONFIG) {
        this.appConfig = CONFIG;
    }

    $onInit() {
        this.logoImage = this.appConfig.assetUrl + '/images/logo/threadlab@190x41.png';
    }
}
