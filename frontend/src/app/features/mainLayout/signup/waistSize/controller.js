import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/uniqBy';
import cloneDeep from 'lodash/cloneDeep';
import each from 'lodash/each';

/* @ngInject */
export default class WaistSize {
    constructor(genericWaistSizes, customerSignupModel, $state) {
    	this.genericWaistSizes = genericWaistSizes[0].data.data.sizes;
        this.customerSignupModel = customerSignupModel;
        this.ignoredWaistSizes = ['28'];
        this.$state = $state;
    }

    $onInit() {
        this.genericWaistSizes = this.applyFilters(this.genericWaistSizes, this.ignoredWaistSizes);
        this.waistSizeOptions = this.prepareData(this.genericWaistSizes);
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
            this.customerSignupModel.user.waistSizeOptions = this.waistSizeOptions;
            this.$state.go(`index.signup.${next}`);
        }
    }
}
