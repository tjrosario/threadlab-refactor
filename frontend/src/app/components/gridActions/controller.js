/* @ngInject */
export default class GridActions {
    constructor($element) {
        this.$element = $element;
    }

    $onInit() {
        const element = this.$element[0];

        if (!element.hasAttribute('on-read')) {
            this.$element.find('.btn-read').hide();
        }

        if (!element.hasAttribute('on-edit')) {
            this.$element.find('.btn-edit').hide();
        }

        if (!element.hasAttribute('on-delete')) {
            this.$element.find('.btn-delete').hide();
        }        
    }
}
