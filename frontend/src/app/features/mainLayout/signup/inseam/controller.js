import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/uniqBy';
import cloneDeep from 'lodash/cloneDeep';
import each from 'lodash/each';

/* @ngInject */
export default class Inseam {
    constructor(genericInseams, customerSignupModel, $state) {
    	this.genericInseams = genericInseams[0].data.data.sizes;
        this.customerSignupModel = customerSignupModel;
        this.ignoredInseams = [];
        this.$state = $state;
    }

    $onInit() {
        this.genericInseams = this.applyFilters(this.genericInseams, this.ignoredInseams);
        this.inseamOptions = this.prepareData(this.genericInseams);
    }

    prepareData(data) {
    	const result = cloneDeep(data);

    	return {
    		list: this.deDuplicate(result, 'value'),
    		selected: []
    	};
    }

    applyFilters(data, ignored) {
        const result = cloneDeep(data);

        each(result, (item, i) => {
            each(ignored, ignore => {
                if (item.value === ignore) {
                    delete result[i];
                }
            });
        });

        return result;
    }

    deDuplicate(list, key) {
    	return uniqBy(list, key);
    }

    proceed(data, next) {
        if (data.selected.length > 0) {
            this.customerSignupModel.user.inseamOptions = this.inseamOptions;
            this.$state.go(`index.signup.${next}`);
        }
    }
}
