/* @ngInject */
export default class StatesField {
    constructor(statesService) {
        this.states = statesService.getEntities();
    }
}
