import cloneDeep from 'lodash/cloneDeep';

/* @ngInject */
export default class Height {
    constructor(heightsService, $state) {
    	this.heights = heightsService.getEntities();
        this.$state = $state;
    }

    $onInit() {
        this.heights = this.prepareData(this.heights);
    }

    prepareData(data) {
        const result = cloneDeep(data);

        return {
            list: result,
            selected: []
        };
    }

    proceed(data, next) {
        if (data.selected.length > 0) {
            this.$state.go(`index.signup.${next}`);
        }
    }
}
