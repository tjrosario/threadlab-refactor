/* @ngInject */
export default class BoxSelectionModule {
    constructor(boxesService) {
        this.boxes = boxesService.getEntities().A;
    }

    showBox(box) {
    	
    }
}
