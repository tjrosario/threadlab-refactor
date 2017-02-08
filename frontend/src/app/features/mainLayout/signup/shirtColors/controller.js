import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/uniqBy';
import cloneDeep from 'lodash/cloneDeep';
import each from 'lodash/each';
import map from 'lodash/map';
import first from 'lodash/first';
import filter from 'lodash/filter';
import find from 'lodash/find';

/* @ngInject */
export default class ShirtColors {
    constructor(attributeService, shirtColorCategoriesService, customerSignupModel, $state) {
    	this.attributeService = attributeService;
        this.shirtColorCategoriesService = shirtColorCategoriesService;
        this.shirtColorCategories = this.shirtColorCategoriesService.getEntities();
        this.customerSignupModel = customerSignupModel;
        this.$state = $state;
    }

    $onInit() {
        each(this.shirtColorCategories, cat => {
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

    setPreferenceMappings(set, conditionVal, setVal) {
        let foundCondition, foundSetVals;

        foundCondition = first(filter(set.selected, (item) => {
            return item.value === conditionVal;
        }));

        if (foundCondition) {
            foundSetVals = filter(set.unselected, (item) => {
                return item.value === setVal;
            });

            each(foundSetVals, obj => {
                let foundSelected = filter(set.unselected, (item) => {
                    return item.value === obj.value;
                });

                each(foundSelected, sel => {
                    set.selected.push(sel);

                    each(set.unselected, (unsel, i) => {
                        if (unsel.value === sel.value) {
                            set.unselected.splice(i, 1);
                        }
                    });
                });
            });
        }
    }

    setSizeDislikePrefs(model, set) {
        let unselected;
        unselected = [];

        each(set.list, obj => {
          let exists, selectedID, selectedValue;

          each(model.unselected, unsel => {
            if (obj.value === unsel.value) {
              unselected.push(obj);
            }
          });

          //selectedID = objectFindByKey(model.selected, 'id', obj.id);
          selectedID = find(model.selected, { id: obj.id });

          //selectedValue = objectFindByKey(model.selected, 'value', obj.value);
          selectedValue = find(model.selected, { value: obj.value });
          
          //exists = objectFindByKey(unselected, 'value', obj.value);
          exists = find(unselected, { value: obj.value });
          
          if (!selectedID && !selectedValue && !exists) {
            unselected.push(obj);
          }
        });
        
        set.unselected = unselected;
        set.selected = model.selected;
    }

    setUnselected(options, opts) {
        let found, foundMap, foundMapSelected;
        
        opts = opts || {};
        opts.mappings = opts.mappings || void 0;

        if (opts.mappings) {
          for (var key in opts.mappings) {
            if (opts.mappings.hasOwnProperty(key)) {
              found = first(filter(options.selected, item => {
                return item.value === key;
              }));

              if (found) {
                foundMap = first(filter(options.list, item => {
                  return item.value === opts.mappings[key];
                }));
                
                foundMapSelected = first(filter(options.selected, item => {
                  return item.value === opts.mappings[key];
                }));

                if (foundMap && !foundMapSelected) {
                  options.selected.push(foundMap);
                }
              }
            }
          }
        }

        const unselected = [];

        each(options.list, obj => {
          found = first(filter(options.selected, item => {
            return item.id === obj.id;
          }));

          if (!found) {
            unselected.push(obj);
          }
        });
        
        options.unselected = unselected;  
    }

    setFitandStylePreferences() {
        this.setUnselected(this.customerSignupModel.user.jeansFitOptions, {
            mappings: {
                Relaxed: "Regular"
            }
        });
        this.setUnselected(this.customerSignupModel.user.casualShirtFitOptions);
        this.setSizeDislikePrefs(this.customerSignupModel.user.jeansFitOptions, this.customerSignupModel.user.pantsFitOptions);
        this.setSizeDislikePrefs(this.customerSignupModel.user.casualShirtFitOptions, this.customerSignupModel.user.shirtFitOptions);
        this.setPreferenceMappings(this.customerSignupModel.user.shirtFitOptions, 'Slim', 'Extra Slim');
        this.setPreferenceMappings(this.customerSignupModel.user.shirtFitOptions, 'Regular', 'Full'); 
    }

    proceed(data, next) {
        each(this.shirtColorCategories, cat => {
            this.customerSignupModel.user[cat.scopeName] = this[cat.scopeName];
        });

        this.setFitandStylePreferences();
        this.$state.go(`index.signup.${next}`);
    }
}
