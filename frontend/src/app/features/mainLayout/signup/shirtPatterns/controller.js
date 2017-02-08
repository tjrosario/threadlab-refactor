import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/uniqBy';
import cloneDeep from 'lodash/cloneDeep';
import each from 'lodash/each';
import map from 'lodash/map';

/* @ngInject */
export default class ShirtPatterns {
    constructor(attributeService, shirtPatternCategoriesService, customerSignupModel, $state) {
    	this.attributeService = attributeService;
        this.shirtPatternCategoriesService = shirtPatternCategoriesService;
        this.shirtPatternCategories = this.shirtPatternCategoriesService.getEntities();
        this.customerSignupModel = customerSignupModel;
        this.$state = $state;
    }

    $onInit() {
        each(this.shirtPatternCategories, cat => {
            const config = {
                params: {
                    xCharacteristic: 'Pattern',
                    xProductCategory: cat.name
                }
            };
            
            this.attributeService.findAll({ config })
                .then(resp => {
                    const data = resp.data;
                    if (data.success) {
                        const list = map(data.data.attributes, pattern => pattern);
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
        each(this.shirtPatternCategories, cat => {
            this.customerSignupModel.user[cat.scopeName] = this[cat.scopeName];
        });
        this.$state.go(`index.signup.${next}`);
    }
}
