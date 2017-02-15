import angular from 'angular';

const serviceName = 'note';

/* @ngInject */
class NoteService {
    constructor($http) {
        this.$http = $http;
    }

    getEntity({ id, config = {}}) {
        return this.$http
            .get(`/note/show/${id}`, config);
    }

    createEntity({ config = {}}) {
        return this.$http
            .get('/note/create', config);
    }

    updateEntity({ id, config = {}}) {
        return this.$http
            .get(`/note/update/${id}`, config);
    }

    deleteEntity({ id, config = {}}) {
        return this.$http
            .get(`/note/delete/${id}`, config);
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, NoteService)
    .name;