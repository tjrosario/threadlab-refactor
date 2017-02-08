import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/uniqBy';
import cloneDeep from 'lodash/cloneDeep';
import each from 'lodash/each';
import map from 'lodash/map';

/* @ngInject */
export default class PantsFit {
    constructor(genericPantFits, customerSignupModel, $state) {
    	this.genericPantFits = genericPantFits[0].data.data.attributes;
        this.customerSignupModel = customerSignupModel;
        this.$state = $state;
    }

    $onInit() {
        this.pantsFitOptions = this.prepareData(this.genericPantFits);
        this.jeansFitOptions = this.applyFilters(this.pantsFitOptions, 'Jeans');
    }

    prepareData(data) {
    	const result = cloneDeep(data);

    	return {
    		list: this.sortSizes(map(result, size => size)),
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

    sortSizes(sizes) {
        return sortBy(sizes, size => size.value);
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
            this.customerSignupModel.user.pantsFitOptions = this.pantsFitOptions;
            this.customerSignupModel.user.jeansFitOptions = this.jeansFitOptions;
            this.$state.go(`index.signup.${next}`);
        }
    }
}
