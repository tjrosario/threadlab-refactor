import angular from 'angular';
import range from 'lodash/range';

const serviceName = 'priceRangeCategories';

class PriceRangeCategories {
    constructor() {
        'ngInject';
    }

    getEntities() {
        return [{
            name: 'Jeans',
            scopeName: 'jeansPriceRange'
        }, {
            name: 'Shorts',
            scopeName: 'shortsPriceRange'
        }, {
            name: 'Chinos',
            scopeName: 'chinosPriceRange'
        }, {
            name: 'Dress Pants',
            scopeName: 'dressPantsPriceRange'
        }, {
            name: 'Casual Shirt',
            scopeName: 'casualShirtPriceRange'
        }, {
            name: 'Golf / Polo Shirt',
            scopeName: 'golfPoloShirtPriceRange'
        }, {
            name: 'Sweater',
            scopeName: 'sweaterPriceRange'
        }, {
            name: 'Sweatshirt',
            scopeName: 'sweatshirtPriceRange'
        }, {
            name: 'T-shirt',
            scopeName: 'tshirtPriceRange'
        }];
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, PriceRangeCategories)
    .name;