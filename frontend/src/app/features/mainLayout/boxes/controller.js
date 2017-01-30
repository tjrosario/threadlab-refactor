export default class Boxes {
    constructor(boxesService) {
    	this.boxes = boxesService.getEntities().A;
    }
}