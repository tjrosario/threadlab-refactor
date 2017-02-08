import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/uniqBy';
import cloneDeep from 'lodash/cloneDeep';
import each from 'lodash/each';

/* @ngInject */
export default class Signup {
    constructor(weightsService, heightsService, customerSignupModel) {
       this.weights = weightsService.getEntities();
       this.heights = heightsService.getEntities();
    }

    $onInit() {
    	
    }
}
