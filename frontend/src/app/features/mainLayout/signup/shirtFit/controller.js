import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/uniqBy';
import cloneDeep from 'lodash/cloneDeep';
import each from 'lodash/each';
import map from 'lodash/map';

/* @ngInject */
export default class ShirtFit {
    constructor(genericShirtFits, customerSignupModel, $state) {
    	this.genericShirtFits = genericShirtFits[0].data.data.attributes;
        this.customerSignupModel = customerSignupModel;
        this.$state = $state;
    }

    $onInit() {
        this.shirtFitOptions = this.prepareData(this.genericShirtFits);
        this.casualShirtFitOptions = this.applyFilters(this.shirtFitOptions, 'Casual Shirt');
    }

    prepareData(data) {
    	const result = cloneDeep(data);

    	return {
    		list: result,
    		selected: []
    	};
    }

    applyFilters(data, category) {
        const result = cloneDeep(data);
        result.list = [];
        result.selected = [];

        each(data.list, fit => {
            if (fit.xProductCategory === category) {
                result.list.push(fit);
            }
        });

        result.list = this.sortFits(result.list);

        return result;
    }

    sortFits(fits) {
        return sortBy(fits, fit => {
            const rank = {
                Slim: 1,
                Regular: 2,
                Relaxed: 3
            };

            return rank[fit.value];
        });
    }

    proceed(data, next) {
        if (data.selected.length > 0) {
            this.customerSignupModel.user.shirtFitOptions = this.shirtFitOptions;
            this.customerSignupModel.user.casualShirtFitOptions = this.casualShirtFitOptions;
            this.$state.go(`index.signup.${next}`);
        }
    }
}
