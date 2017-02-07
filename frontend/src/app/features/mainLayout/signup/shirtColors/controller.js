import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/uniqBy';
import cloneDeep from 'lodash/cloneDeep';
import each from 'lodash/each';
import map from 'lodash/map';

/* @ngInject */
export default class ShirtColors {
    constructor(attributeService, shirtColorCategoriesService, $state) {
    	this.attributeService = attributeService;
        this.shirtColorCategoriesService = shirtColorCategoriesService;
        this.$state = $state;
    }

    $onInit() {
        const shirtColorCategories = this.shirtColorCategoriesService.getEntities();

        map(shirtColorCategories, cat => {
            const config = {
                params: {
                    xCharacteristic: 'Color',
                    xProductCategory: cat.name
                }
            };
            
            this.attributeService.findAll({ config })
                .then(resp => {
                    const data = resp.data;
                    if (data.success) {
                        const list = map(data.data.attributes, color => color);
                        this[cat.scopeName] = {
                            list: list.sort(this.sortAlphabetically),
                            selected: []
                        };
                    }
                });
        });
    }

    sortAlphabetically(a, b) {
        if (a.value < b.value) {
          return -1;
        }
        if (a.value > b.value) {
          return 1;
        }
        return 0;
    }

    proceed(data, next) {
        this.$state.go(`index.signup.${next}`);
    }
}
