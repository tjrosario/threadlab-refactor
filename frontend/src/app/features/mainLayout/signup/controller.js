import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/uniqBy';
import cloneDeep from 'lodash/cloneDeep';
import each from 'lodash/each';

/* @ngInject */
export default class Signup {
    constructor(weightsService, heightsService, customerSignupModel, $scope) {
       this.weights = weightsService.getEntities();
       this.heights = heightsService.getEntities();
       this.$scope = $scope;
       this.customerSignupModel = customerSignupModel;
    }

    $onInit() {
    	
    }
}
