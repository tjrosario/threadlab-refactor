import cloneDeep from 'lodash/cloneDeep';
import map from 'lodash/map';

/* @ngInject */
export default class Weight {
    constructor(weightsService, customerSignupModel, $state) {
    	this.weights = weightsService.getEntities();
        this.customerSignupModel = customerSignupModel;
        this.$state = $state;
    }

    $onInit() {
        this.weights = this.prepareData(this.weights);
    }

    prepareData(data) {
        let result = cloneDeep(data);

        result = map(result, (item) => {
            return {
                value: item.toString()
            }
        });

        return {
            list: result,
            selected: []
        };
    }

    proceed(data, next) {
        if (data.selected.length > 0) {
            this.customerSignupModel.user.weights = this.weights;
            this.$state.go(`index.signup.${next}`);
        }
    }
}
