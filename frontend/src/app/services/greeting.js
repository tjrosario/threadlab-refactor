import angular from 'angular';
import find from 'lodash/find';

const serviceName = 'greeting';

/* @ngInject */
class GreetingService {
    constructor() {
        'ngInject';
        this.data = [
            [0, 4, 'Good evening'], 
            [5, 11, 'Good morning'], 
            [12, 17, 'Good afternoon'], 
            [18, 24, 'Good evening']
        ];
    }

    getGreeting(hour) {
        let i = 0;

        while (i < this.data.length) {
            if (hour >= this.data[i][0] && hour <= this.data[i][1]) {
                return this.data[i][2];
            }
            i++;
        }
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, GreetingService)
    .name;