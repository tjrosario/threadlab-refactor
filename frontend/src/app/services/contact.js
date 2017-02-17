import angular from 'angular';

const serviceName = 'contact';

class ContactService {
    constructor() {
        'ngInject';
    }

    getSubjects() {
        return [{
            title: 'General Inquiry',
            email: 'service@mythreadlab.com'
        }, {
            title: 'Press',
            email: 'press@mythreadlab.com'
        }, {
            title: 'Careers',
            email: 'careers@mythreadlab.com'
        }];
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, ContactService)
    .name;