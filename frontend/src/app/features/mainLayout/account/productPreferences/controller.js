import cloneDeep from 'lodash/cloneDeep';
import filter from 'lodash/filter';
import each from 'lodash/each';

/* @ngInject */
export default class AccountProductPreferences {
    constructor(customer, productCategories, measurementPreferenceService, styleDislikeService, pricePreferenceService, notificationsService) {
        this.customer = customer[0].data.data;
        this.productCategories = productCategories[0].data.data.productCategorys;
        this.measurementPreferenceService = measurementPreferenceService;
        this.styleDislikeService = styleDislikeService;
        this.pricePreferenceService = pricePreferenceService;
        this.notificationsService = notificationsService;
    }

    $onInit() {
    	this.productPreferences = this.prepareProductPreferencesData();
    }

    prepareProductPreferencesData() {
        const productPreferences = [];
        const customer = cloneDeep(this.customer);
        const productCategories = cloneDeep(this.productCategories);
        const measurementPreferences = customer.measurementPreferences;
        const pricePreferences = customer.pricePreferences;
        const styleDislikes = customer.styleDislikes;

        each(productCategories, cat => {
            let measurements = cat.productMeasurements;
            const priceRanges = cat.priceRanges.reverse();
            const characteristics = cat.characteristics;

            each(measurements, measurement => {
                const allowedSizes = measurement.allowedSizes.reverse();
                each(measurementPreferences, preference => {
                    measurement.productPreferences = preference;
                    if (preference.size.xProductCategory === measurement.xProductCategory) {
                        if (preference.size.xProductMeasurement === measurement.name) {
                            each(allowedSizes, size => {
                                if (preference.size.value === size.value) {
                                    size.measurementPreference = preference;
                                    size.selected = true;
                                }
                            });
                        }
                    }
                });
            });

            each(priceRanges, price => {
                each(pricePreferences, preference => {
                    price.productPreference = preference;
                    if (preference.priceRange.xProductCategory === price.xProductCategory) {
                        if ((preference.priceRange.lowerLimit === price.lowerLimit) && (preference.priceRange.upperLimit === price.upperLimit)) {
                            price.pricePreference = preference;
                            price.selected = true;
                        }
                    }
                });
            });

            each(characteristics, char => {
                const allowedAttributes = char.allowedAttributes.reverse();
                each(styleDislikes, styleDislike => {
                    if (styleDislike.attribute.xProductCategory === char.xProductCategory) {
                        if (styleDislike.attribute.xCharacteristic === char.name) {
                            each(allowedAttributes, attribute => {
                                if (styleDislike.attribute.value === attribute.value) {
                                    attribute.productPreference = styleDislike;
                                    attribute.selected = true;
                                }
                            });
                        }
                    }
                });
            });

            measurements.sort(this.sortByName);

            const isBottom = (cat.name === 'Chinos') || (cat.name === 'Dress Pants') || (cat.name === 'Jeans');

            if (isBottom) {
                const gw = filter(measurements, e => e.name === 'Generic Waist');
                const gwRemoved = filter(measurements, e => e.name !== 'Generic Waist');
                gwRemoved.unshift(gw[0]);
                measurements = gwRemoved;
            }

            const row = {
                category: cat.name,
                status: cat.status,
                buttonClass: cat.name.replace(/\s+/g, '-').replace(/\//g, '').toLowerCase(),
                productMeasurements: measurements,
                priceRanges,
                characteristics: characteristics.sort(this.sortByName)
            };

            if (row.status === 'active') {
                productPreferences.push(row);
            }
        });

        return productPreferences;
    }

    toggleMeasurementPreference(allowedSize) {
        if (allowedSize.selected) {
            const id = allowedSize.measurementPreference.id;

            this.measurementPreferenceService.deleteEntity({ id })
                .then(resp => {
                    if (resp.data.success) {
                        this.notificationsService.success({ msg: 'Measurement Preference Updated' });
                        allowedSize.selected = false;
                    } else {
                        this.notificationsService.alert({ msg: resp.data.message });
                    }
                }, err => {
                    this.notificationsService.alert({ msg: err.message });
                });

        } else {
            const config = {
                params: {
                    'size.id': allowedSize.id
                }
            };

            this.measurementPreferenceService.createEntity({ config })
                .then(resp => {
                    if (resp.data.success) {
                        this.notificationsService.success({ msg: 'Measurement Preference Updated' });
                        allowedSize.selected = true;
                        allowedSize.measurementPreference = resp.data.data;
                    } else {
                        this.notificationsService.alert({ msg: resp.data.message });
                    }
                }, err => {
                    this.notificationsService.alert({ msg: err.message });
                });
        }
    }

    toggleProductPreference(allowedAttribute) {
        if (allowedAttribute.selected) {
            const id = allowedAttribute.productPreference.id;

            this.styleDislikeService.deleteEntity({ id })
                .then(resp => {
                    if (resp.data.success) {
                        this.notificationsService.success({ msg: 'Style Preference Updated' });
                        allowedAttribute.selected = false;
                    } else {
                        this.notificationsService.alert({ msg: resp.data.message });
                    }
                }, err => {
                    this.notificationsService.alert({ msg: err.message });
                });
        } else {
            const config = {
                params: {
                    'attribute.id': allowedAttribute.id
                }
            };

           this.styleDislikeService.createEntity({ config })
                .then(resp => {
                    if (resp.data.success) {
                        this.notificationsService.success({ msg: 'Style Preference Updated' });
                        allowedAttribute.selected = true;
                        allowedAttribute.productPreference = resp.data.data;
                    } else {
                        this.notificationsService.alert({ msg: resp.data.message });
                    }
                }, err => {
                    this.notificationsService.alert({ msg: err.message });
                });
        }
    }

    togglePricePreference(priceRange) {
        if (priceRange.selected) {
            const id = priceRange.pricePreference.id;

            this.pricePreferenceService.deleteEntity({ id })
                .then(resp => {
                    if (resp.data.success) {
                        this.notificationsService.success({ msg: 'Price Preference Updated' });
                        priceRange.selected = false;
                    } else {
                        this.notificationsService.alert({ msg: resp.data.message });
                    }
                }, err => {
                    this.notificationsService.alert({ msg: err.message });
                });
        } else {
            const config = {
                params: {
                    'priceRange.id': priceRange.id
                }
            };

           this.pricePreferenceService.createEntity({ config })
                .then(resp => {
                    if (resp.data.success) {
                        this.notificationsService.success({ msg: 'Price Preference Updated' });
                        priceRange.selected = true;
                        priceRange.pricePreference = resp.data.data;
                    } else {
                        this.notificationsService.alert({ msg: resp.data.message });
                    }
                }, err => {
                    this.notificationsService.alert({ msg: err.message });
                });
        }
    }

    sortByName(a, b) {
        if (a.name < b.name) {
          return -1;
        }

        if (a.name > b.name) {
          return 1;
        }

        return 0;
    }
}
