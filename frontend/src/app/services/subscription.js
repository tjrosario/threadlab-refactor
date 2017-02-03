import angular from 'angular';

const serviceName = 'subscription';

/* @ngInject */
class SubscriptionService {
    constructor($http) {
        
    }

    getFrequencyData() {
        return [{
            name: 'Monthly',
            value: 1,
            description: '(every month)'
        }, {
            name: 'Bimonthly',
            value: 2,
            description: '(every two months)'
        }, {
            name: 'Quarterly',
            value: 3,
            description: '(every three months)'
        }, {
            name: 'Biannually',
            value: 6,
            description: '(every six months)'
        }, {
            name: 'Annually',
            value: 12,
            description: '(once per year)'
        }];
    }

    getBudgetData() {
        return  [{
            value: '39.99',
            numCategories: 3,
            description: '(2 - 6 items) (Socks, Boxer-briefs, Undershirts)'
        }, {
            value: '59.00',
            numCategories: 3,
            description: '(1 - 3 items)'
        }, {
            value: '99.00',
            numCategories: 3,
            description: '(2 - 4 items)'
        }, {
            value: '149.00',
            numCategories: 5,
            description: '(3 - 5 items)'
        }, {
            value: '299.00',
            numCategories: 7,
            description: '(5 - 8 items)'
        }];
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, SubscriptionService)
    .name;