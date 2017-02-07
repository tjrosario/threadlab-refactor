import angular from 'angular';
import range from 'lodash/range';

const serviceName = 'heights';

class HeightsService {
    constructor() {
        'ngInject';
    }

    getEntities() {
        return [
        	'5\'0"',
        	'5\'1"',
        	'5\'2"',
        	'5\'3"',
        	'5\'4"',
        	'5\'5"',
        	'5\'6"',
        	'5\'7"',
        	'5\'8"',
        	'5\'9"',
        	'5\'10"',
        	'5\'11"',
        	'6\'0"',
        	'6\'1"',
        	'6\'2"',
        	'6\'3"',
        	'6\'4"',
        	'6\'5"',
        	'6\'6"',
        	'6\'7"'
        ];
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, HeightsService)
    .name;