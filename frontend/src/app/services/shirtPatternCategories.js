import angular from 'angular';
import range from 'lodash/range';

const serviceName = 'shirtPatternCategories';

class ShirtPatternCategories {
    constructor() {
        'ngInject';
    }

    getEntities() {
        return [{
			name: 'Casual Shirt',
			scopeName: 'casualShirtPattern'
		}, {
			name: 'Dress Shirts',
			scopeName: 'dressShirtPattern'
		}, {
			name: 'Golf / Polo Shirt',
			scopeName: 'golfPoloShirtPattern'
		}, {
			name: 'Sweater',
			scopeName: 'sweaterPattern'
		}, {
			name: 'Sweatshirt',
			scopeName: 'sweatshirtPattern'
		}];
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, ShirtPatternCategories)
    .name;