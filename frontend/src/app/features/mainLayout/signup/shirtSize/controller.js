import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/uniqBy';
import cloneDeep from 'lodash/cloneDeep';

/* @ngInject */
export default class ShirtSize {
    constructor(casualShirtSizes, $state) {
    	this.casualShirtSizes = casualShirtSizes[0].data.data.sizes;
        this.$state = $state;
    }

    $onInit() {
        this.casualShirtSizeOptions = this.prepareData(this.casualShirtSizes);
    }

    prepareData(data) {
    	const result = cloneDeep(data);

    	return {
    		list: this.deDuplicate(result, 'value'),
    		selected: []
    	};
    }

    deDuplicate(list, key) {
    	return uniqBy(list, key);

    	//return sortBy(uniq(list, size => size[key]), size => size[key]);
    }

    proceed(data, next) {
        if (data.selected.length > 0) {
            this.$state.go(`index.signup.${next}`);
        }
    }
}
