import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/uniqBy';
import cloneDeep from 'lodash/cloneDeep';
import each from 'lodash/each';
import map from 'lodash/map';
import first from 'lodash/first';
import filter from 'lodash/filter';
import find from 'lodash/find';
import getMatchByIndex from 'utils/getMatchByIndex';

/* @ngInject */
export default class ShirtColors {
    constructor(attributeService, priceRangeService, shirtColorCategoriesService, shirtPatternCategoriesService, collarTypeCategoriesService, priceRangeCategoriesService, customerSignupModel, customerService, styleDislikeService, pricePreferenceService, $state, $q, facebookService, mailchimpService, CONFIG) {
    	this.attributeService = attributeService;
        this.priceRangeService = priceRangeService;
        this.shirtColorCategories = shirtColorCategoriesService.getEntities();
        this.shirtPatternCategories = shirtPatternCategoriesService.getEntities();
        this.collarTypeCategories = collarTypeCategoriesService.getEntities();
        this.priceRangeCategories = priceRangeCategoriesService.getEntities();
        this.customerSignupModel = customerSignupModel;
        this.customerService = customerService;
        this.styleDislikeService = styleDislikeService;
        this.pricePreferenceService = pricePreferenceService;
        this.$state = $state;
        this.$q = $q;
        this.facebookService = facebookService;
        this.mailchimpService = mailchimpService;
        this.appConfig = CONFIG;
    }

    $onInit() {
        this.stepIsValid = false;

        const total = this.shirtColorCategories.length + this.priceRangeCategories.length;
        let count = 0;

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
                        this[cat.scopeName] = this.customerSignupModel.user[cat.scopeName] = {
                            list: list.sort(this.sortAlphabetically),
                            selected: []
                        };
                        count++;

                        this.checkInitStatus(count, total);
                    }
                });
        });

        each(this.priceRangeCategories, cat => {
            const config = {
                params: {
                    xProductCategory: cat.name
                }
            };

            this.priceRangeService.findAll({ config })
                .then(resp => {
                    const data = resp.data;
                    if (data.success) {
                        const list = map(data.data.priceRanges, price => {
                            price.value = this.priceToText(price);
                            return price;
                        });
                        this[cat.scopeName] = this.customerSignupModel.user[cat.scopeName] = {
                            list: this.sortPrices(list),
                            selected: this.sortPrices(list)
                        };
                        count++;

                        this.checkInitStatus(count, total);
                    }
                });
        });
    }

    checkInitStatus(count, total) {
        return (count === total) ? this.stepIsValid = true : this.stepIsValid = false;
    }

    isStepValid() {
        return this.stepIsValid;
    }

    sortPrices(prices) {
        return sortBy(prices, price => price.upperLimit);
    }

    priceToText(price) {
        if (price.lowerLimit <= 0.01) {
            return `$${price.upperLimit | { number: 0 }} and Under`;
        } else if (price.upperLimit > 900) {
            return `$${price.lowerLimit} and Over`;
        } else {
            return `$${price.upperLimit | { number: 0 }} and Under`;
        }
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

    setPricePreferences(model, set) {
        let selected = [];

        each(model.selected, obj => {
            let found = find(model.list, { id: obj.id });
            selected.push(found);
        });

        each(set, obj => {
            obj.selected = [];
            each(selected, sel => {
                let idx;
                //idx = sel;
                const match = find(obj.list, { id: sel.id });

                //match = getMatchByIndex(idx, obj.list);

                if (match) {
                    obj.selected.push(match);
                }
            });
        });   
    }

    setPriceRangePreferences() {
        const user = this.customerSignupModel.user;
        const bottomsPriceRanges = [];
        const topsPriceRanges = [];

        bottomsPriceRanges.push(user.chinosPriceRange);
        topsPriceRanges.push(user.sweatshirtPriceRange);
        topsPriceRanges.push(user.sweaterPriceRange);

        this.setPricePreferences(user.sweaterPriceRange, topsPriceRanges);
        this.setPricePreferences(user.jeansPriceRange, bottomsPriceRanges);
    }

    getColorPreferences() {
        const colorPreferences = [];
        const user = this.customerSignupModel.user;
        
        each(this.shirtColorCategories, cat => {
            if (cat.scopeName !== 'casualShirtColor') {
                each(user[cat.scopeName].list, attr => {
                    each(user.casualShirtColor.selected, casualShirtSelectedAttr => {
                        if (attr.value === casualShirtSelectedAttr.value) {
                            user[cat.scopeName].selected.push(attr);
                            colorPreferences.push(attr);
                        }
                    });
                });
            }
        });

        each(user.casualShirtColor.selected, casualShirtSelectedAttr => {
            colorPreferences.push(casualShirtSelectedAttr);
        });
        
        return colorPreferences;
    }

    getShirtPatternPreferences() {
        const shirtPatternPreferences = [];
        const user = this.customerSignupModel.user;

        each(this.shirtPatternCategories, cat => {
            if (cat.scopeName !== 'casualShirtPattern') {
                each(user[cat.scopeName].list, attr => {
                    each(user.casualShirtPattern.selected, casualShirtSelectedAttr => {
                        if (attr.value === casualShirtSelectedAttr.value) {
                            user[cat.scopeName].selected.push(attr);
                            shirtPatternPreferences.push(attr);
                        }
                    });
                });
            }
        });

        each(user.casualShirtPattern.selected, casualShirtSelectedAttr => {
            shirtPatternPreferences.push(casualShirtSelectedAttr);
        });

        return shirtPatternPreferences;
    }

    getCollarTypePreferences() {
        const collarTypePreferences = [];
        const user = this.customerSignupModel.user;

        each(this.collarTypeCategories, cat => {
            if (cat.scopeName !== 'casualShirtCollarType') {
                each(user[cat.scopeName].list, attr => {
                    each(user.casualShirtCollarType.selected, casualShirtSelectedAttr => {
                        if (attr.value === casualShirtSelectedAttr.value) {
                            user[cat.scopeName].selected.push(attr);
                            collarTypePreferences.push(attr);
                        }
                    });
                });
            }
        });

        each(user.casualShirtCollarType.selected, casualShirtSelectedAttr => {
            collarTypePreferences.push(casualShirtSelectedAttr);
        });

        return collarTypePreferences;
    }

    onBeforeCustomerSave(user) {
        const profile = user.profile;

        profile.statedHeight = first(user.heights.selected).value;
        profile.statedWeight = first(user.weights.selected).value;
        profile.statedWaist = first(user.waistSizeOptions.selected).value;
        profile.statedInseam = first(user.inseamOptions.selected).value;
        profile.statedPantFit = first(user.jeansFitOptions.selected).value;
        profile.statedShirtSize = first(user.casualShirtSizeOptions.selected).value;
        profile.signUpMethod = 'web-flow';
    }

    onCustomerSave(customer) {
        const user = this.customerSignupModel.user;
        user.colorDislikes = this.getColorPreferences();
        user.shirtPatternDislikes = this.getShirtPatternPreferences();
        let promises;

        const styleDislikes = map(
            user.shirtFitOptions.unselected
            .concat(user.pantsFitOptions.unselected)
            .concat(user.colorDislikes)
            .concat(user.shirtPatternDislikes), attr => ({
                'customer.id': customer.id,
                'attribute.id': attr.id
        }));

        const prices = map(
            user.jeansPriceRange.selected
            .concat(user.shortsPriceRange.selected)
            .concat(user.chinosPriceRange.selected)
            .concat(user.dressPantsPriceRange.selected)
            .concat(user.casualShirtPriceRange.selected)
            .concat(user.golfPoloShirtPriceRange.selected)
            .concat(user.sweaterPriceRange.selected)
            .concat(user.sweatshirtPriceRange.selected)
            .concat(user.tshirtPriceRange.selected), price => ({
                'customer.id': customer.id,
                'priceRange.id': price.id
        }));

        console.log(styleDislikes);
        console.log(prices);

        if (styleDislikes.length > 0) {
            promises = this.$q.all(
                this.styleDislikeService.createAllEntities({ data: styleDislikes }), 
                this.pricePreferenceService.createAllEntities({ data: prices })
            );
        } else {
            promises = this.$q.all(
                this.pricePreferenceService.createAllEntities({ data: prices })
            );
        }

        return promises;
    }

    trackFacebookConversion() {
        this.facebookService.trackPixel('track', 'CompleteRegistration');
    }

    trackSignupConversion() {
        if (window.google_trackConversion) {
            adWords.google_conversion_label = 'ABlWCKPQh1wQyoO7-AM';
            window.google_trackConversion(adWords);
        }
    }

    subscribeMailchimp(customerInfo, opts) {
        opts = opts || {};
        opts.callback = opts.callback || () => {};

        const customer = customerInfo.customer;

        const data = {
            id: this.appConfig.mailchimp.lists.postSignup,
            email: {
                email: customer.email
            },
            merge_vars: {
                FNAME: customer.firstName,
                LNAME: customer.lastName
            },
            double_optin: false
        };

        this.mailchimpService.subscribe({ data })
            .then(resp => {
                opts.callback();
            }, err => {
                opts.callback();
            });
    }

    completeSignup(data) {
        this.setFitandStylePreferences();
        this.setPriceRangePreferences();
        
        this.onBeforeCustomerSave(this.customerSignupModel.user);

        const config = {
            params: this.customerSignupModel.user.profile
        };
        
        this.customerService.createEntity({ config })
            .then(resp => {
                if (resp.data.success) {
                    const customer = resp.data.data;

                    this.onCustomerSave(customer)
                        .then(resp => {
                            const type = customer.facebookId ? 'facebook' : 'email';
                            const customerInfo = {
                                customer,
                                credentials,
                                type,
                                signup: true
                            };
                            
                            this.trackSignupConversion();
                            this.trackFacebookConversion();
                            this.subscribeMailchimp(customerInfo, {
                                callback: () => {
                                    console.log('go to signup confirm');
                                }
                            });

                        }, err => {
                            this.notificationsService.alert({ msg: err.message });
                        });

                } else {
                    this.notificationsService.alert({ msg: resp.data.message });
                }
            }, err => {
                this.notificationsService.alert({ msg: err.message });
            });


        //this.$state.go(`index.signup.${next}`);
    }
}
