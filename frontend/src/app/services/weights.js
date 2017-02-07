import angular from 'angular';
import range from 'lodash/range';

const serviceName = 'weights';

class WeightsService {
    constructor() {
        'ngInject';
    }

    getEntities() {
        return range(105, 300, 5);
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, WeightsService)
    .name;