import cloneDeep from 'lodash/cloneDeep';
import each from 'lodash/each';
import find from 'lodash/find';

/* @ngInject */
export default class ReferenceItemForm {
    constructor() {
    	this.referenceItem = this.resolve.referenceItem || {};
        this.dimensions = this.resolve.category.dimensions || {};
        this.customerMeasurements = this.referenceItem.customerMeasurements;
    }

    $onInit() {
    	this.formData = cloneDeep(this.referenceItem);
        this.formData.dimensions = {};
        this.formData.originalDimensions = {};

        each(this.dimensions, dimension => {
            const found = find(this.customerMeasurements, ['dimension.id', dimension.id]);

            if (found) {
                this.formData.dimensions[dimension.id] = this.formData.originalDimensions[dimension.id] = found.value;
            }
        });
    }

    prepareFormData() {
        const $filter = this.$filter;
    	const formData = cloneDeep(this.formData);

    	return formData;
    }

    isRequiredFieldsValid() {
        return  this.formData.name;
    }

    submit() {
    	this.close({$value: this.prepareFormData()});
    }

    cancel() {
    	this.dismiss({$value: ''});
    }
}