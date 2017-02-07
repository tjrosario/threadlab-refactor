import angular from 'angular';
import range from 'lodash/range';

const serviceName = 'heights';

class HeightsService {
    constructor() {
        'ngInject';
    }

    getEntities() {
        return [{
            value: '5\'0"'
        }, {
            value: '5\'1"'
        }, {
            value: '5\'2"'
        }, {
            value: '5\'3"'
        }, {
            value: '5\'4"'
        }, {
            value: '5\'5"'
        }, {
            value: '5\'6"'
        }, {
            value: '5\'7"'
        }, {
            value: '5\'8"'
        }, {
            value: '5\'9"'
        }, {
            value: '5\'10"'
        }, {
            value: '5\'11"'
        }, {
            value: '6\'0"'
        }, {
            value: '6\'1"'
        }, {
            value: '6\'2"'
        }, {
            value: '6\'3"'
        }, {
            value: '6\'4"'
        }, {
            value: '6\'5"'
        }, {
            value: '6\'6"'
        }, {
            value: '6\'7"'
        }];
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, HeightsService)
    .name;