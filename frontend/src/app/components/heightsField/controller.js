/* @ngInject */
export default class HeightsField {
    constructor(heightsService) {
        this.heights = heightsService.getEntities();
    }
}
