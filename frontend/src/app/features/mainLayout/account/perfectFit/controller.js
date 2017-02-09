import cloneDeep from 'lodash/cloneDeep';
import reject from 'lodash/reject';
import each from 'lodash/each';
import filter from 'lodash/filter';
import first from 'lodash/first';
import find from 'lodash/find';
import merge from 'lodash/merge';
import without from 'lodash/without';

import { componentName as referenceItemForm } from './components/referenceItemForm/component';

/* @ngInject */
export default class AccountPerfectFit {
    constructor(customer, productCategories, $uibModal, referenceItemService, customerMeasurementService, notificationsService, $q) {
        this.customer = customer[0].data.data;
        this.referenceItems = this.customer.referenceItems;
        this.measuredKeptOrderItems = this.customer.measuredKeptOrderItems;
        this.productCategories = productCategories[0].data.data.productCategorys;
        this.$uibModal = $uibModal;
        this.referenceItemService = referenceItemService;
        this.customerMeasurementService = customerMeasurementService;
        this.notificationsService = notificationsService;
        this.$q = $q;
    }

    $onInit() {
        this.productCategories = this.prepareCategoryData(this.productCategories);
        this.normalizeCategoryData(this.productCategories, this.referenceItems, this.measuredKeptOrderItems);
    }

    prepareCategoryData(data) {
        let result = cloneDeep(data);

        result = reject(result, item => {
            return item.dimensions.length === 0;
        });

        return result;
    }

    normalizeCategoryData(productCategories, referenceItems, measuredKeptOrderItems) {
        each(referenceItems, referenceItem => {
            const category = referenceItem.xProductCategory;
            const found = first(filter(productCategories, item => {
                return item.name === category;
            }));

            if (found) {
                if (!found.referenceItems) {
                    found.referenceItems = [];
                }
                found.referenceItems.push(referenceItem);
            }
        });

        each(measuredKeptOrderItems, orderItem => {
            const category = orderItem.product.xProductCategory;
            orderItem.namePretty = `${orderItem.product.xBrand} - ${orderItem.product.name}`;
            const found = first(filter(productCategories, item => {
                return item.name === category;
            }));

            if (found) {
                if (!found.measuredKeptOrderItems) {
                    found.measuredKeptOrderItems = [];
                }
                found.measuredKeptOrderItems.push(orderItem);
            }
        });

        each(productCategories, category => {
            category.buttonClass = category.name.replace(/\s+/g, '-').replace(/\//g, '').toLowerCase();
            if (category.name === 'Jeans' || category.name === 'Chinos') {
                category.placeholder = 'My Comfy Pants';
            } else if (category.name === 'Shorts') {
                category.placeholder = 'My Beach Shorts';
            } else {
                category.placeholder = 'My Party Shirt';
            }
            if (category.measuredKeptOrderItems) {
                category.measuredKeptOrderItems.sort(this.compareProductName);
                category.newReferenceItem = category.measuredKeptOrderItems[0];
            }
        });
    }

    compareProductName(a, b) {
        if (a.namePretty < b.namePretty) {
          return -1;
        }
        if (a.namePretty > b.namePretty) {
          return 1;
        }
        return 0;
    }

    addReferenceItem(category) {
        const modalInstance = this.$uibModal.open({
            animation: true,
            component: referenceItemForm,
            resolve: {
                config: () => ({
                    title: 'Add PerfectFit Item'
                }),
                category: () => category,
                mode: () => 'add'
            }
        });

        modalInstance.result.then(formData => {
            const dimensions = formData.dimensions;
            const customerMeasurementsPromise = [];
            const config = {
                params: {
                    name: formData.name,
                    description: formData.description,
                    'productCategory.id': category.id
                }
            };
            
            this.referenceItemService.createEntity({ config })
                .then(resp => {
                    if (resp.data.success) {
                        this.notificationsService.success({ msg: 'PerfectFit Item Created' });
                        
                        const cat = find(this.productCategories, { id: category.id });
                        
                        if (!cat.referenceItems) {
                            cat.referenceItems = [];
                        }

                        cat.referenceItems.push(resp.data.data);

                        const referenceItemID = resp.data.data.id;

                        if (dimensions) {
                            each(dimensions, (value, key) => {
                                const dimensionId = key;
                                const createConfig = {
                                    params: {
                                        'dimension.id': dimensionId,
                                        'referenceItem.id': referenceItemID,
                                        value
                                    }
                                };
                                customerMeasurementsPromise.push(this.customerMeasurementService.createEntity({ config: createConfig }));
                            });

                            this.$q.all(customerMeasurementsPromise);
                        }

                    } else {
                        this.notificationsService.alert({ msg: resp.data.message });
                    }
                }, err => {
                    this.notificationsService.alert({ msg: err.message });
                });
        });
    }

    editReferenceItem(referenceItem) {
        const category = find(this.productCategories, { 
            name: referenceItem.xProductCategory 
        });

        const modalInstance = this.$uibModal.open({
            animation: true,
            component: referenceItemForm,
            resolve: {
                config: () => ({
                    title: 'Edit PerfectFit Item'
                }),
                referenceItem: () => referenceItem,
                category: () => category,
                mode: () => 'edit'
            }
        });

        modalInstance.result.then(formData => {
            const dimensions = formData.dimensions;
            const customerMeasurements = formData.customerMeasurements;
            const customerMeasurementsPromise = [];

            if (dimensions) {
                each(dimensions, (value, key) => {
                    const dimensionId = key;
                    const measurement = find(customerMeasurements, ['dimension.id', dimensionId]);
                    const config = {
                        params: { value }
                    };

                    if (measurement) {
                        const id = measurement.id;

                        if (value) {
                            customerMeasurementsPromise.push(this.customerMeasurementService.updateEntity({ id, config }));
                        } else {
                            customerMeasurementsPromise.push(this.customerMeasurementService.deleteEntity({ id, config }));
                        }
                    } else {
                        const createConfig = {
                            params: {
                                'dimension.id': dimensionId,
                                'referenceItem.id': formData.id,
                                value
                            }
                        };

                        customerMeasurementsPromise.push(this.customerMeasurementService.createEntity({ config: createConfig }));
                    }
                });

                this.$q.all(customerMeasurementsPromise);
            }

            const id = formData.id;
            const config = {
                params: {
                    name: formData.name,
                    description: formData.description
                }
            };
            
            this.referenceItemService.updateEntity({ id, config })
                .then(resp => {
                    if (resp.data.success) {
                        this.notificationsService.success({ msg: 'PerfectFit Item Updated' });
                        this.updateReferenceItem(formData);
                    } else {
                        this.notificationsService.alert({ msg: resp.data.message });
                    }
                }, err => {
                    this.notificationsService.alert({ msg: err.message });
                });
        });
    }

    deleteReferenceItem(referenceItem) {
        const id = referenceItem.id;

        this.referenceItemService.deleteEntity({ id })
            .then(resp => {
                if (resp.data.success) {
                    this.notificationsService.success({ msg: 'PerfectFit Item Deleted' });
                    let foundCat = find(this.productCategories, { referenceItems: [{ id }] });
                    const found = find(foundCat.referenceItems, { id });
                    foundCat.referenceItems = without(foundCat.referenceItems, found);
                } else {
                    this.notificationsService.alert({ msg: resp.data.message });
                }
            }, err => {
                this.notificationsService.alert({ msg: err.message });
            });
    }

    updateReferenceItem(data) {
        const id = data.id;
        let found = find(this.productCategories, { referenceItems: [{ id: data.id }] });
        found = find(found.referenceItems, { id: data.id });
        merge(found, data);
    }
}
