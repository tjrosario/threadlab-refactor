import angular from 'angular';
import range from 'lodash/range';

const serviceName = 'collarTypeCategories';

class CollarTypeCategories {
    constructor() {
        'ngInject';
    }

    getEntities() {
        return [{
			name: 'Casual Shirt',
			scopeName: 'casualShirtCollarType'
		}, {
			name: 'Dress Shirts',
			scopeName: 'dressShirtCollarType'
		}];
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, CollarTypeCategories)
    .name;