import angular from 'angular';
import range from 'lodash/range';

const serviceName = 'shirtColorCategories';

class ShirtColorCategories {
    constructor() {
        'ngInject';
    }

    getEntities() {
        return [{
            name: 'Casual Shirt',
            scopeName: 'casualShirtColor'
        }, {
            name: 'Dress Shirts',
            scopeName: 'dressShirtColor'
        }, {
            name: 'Golf / Polo Shirt',
            scopeName: 'golfPoloShirtColor'
        }, {
            name: 'Sweater',
            scopeName: 'sweaterColor'
        }, {
            name: 'Sweatshirt',
            scopeName: 'sweatshirtColor'
        }, {
            name: 'T-shirt',
            scopeName: 'tshirtColor'
        }, {
            name: 'Undershirts',
            scopeName: 'undershirtColor'
        }];
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, ShirtColorCategories)
    .name;