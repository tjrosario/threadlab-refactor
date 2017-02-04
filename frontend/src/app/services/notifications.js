import angular from 'angular';

import filter from 'lodash/filter';
import forEach from 'lodash/forEach';
import merge from 'lodash/merge';

const serviceName = 'notifications';
const toastrTypes = {
    success: 'success',
    warning: 'warning',
    info: 'info',
    error: 'error'
};

let msgTypes = {};

msgTypes[toastrTypes.success] = 'Success';
msgTypes[toastrTypes.warning] = 'Warning';
msgTypes[toastrTypes.info] = 'Information';
msgTypes[toastrTypes.error] = 'Error';

export class NotificationsService {
    constructor($rootScope, toastr) {
        'ngInject';

        this.toastr = toastr;
        this.toasts = [];

        $rootScope.$on('$stateChangeSuccess', this.clearNotifications.bind(this));
    }

    clearNotifications() {
        const notFrozenToasts = filter(this.toasts, toast => !toast.isFrozen);

        forEach(notFrozenToasts, toast => this.toastr.remove(toast.toastId));

        this.toasts.length = 0;
    }

    success({msg, title, isFrozen}) {
        this.notify({type: toastrTypes.success, msg, title, isFrozen});
    }

    warn({msg, title, isFrozen}) {
        this.notify({type: toastrTypes.warning, msg, title, isFrozen});
    }

    info({msg, title, isFrozen}) {
        this.notify({type: toastrTypes.info, msg, title, isFrozen});
    }

    alert({msg, title, isFrozen}) {
        this.notify({type: toastrTypes.error, msg, title, isFrozen});
    }

    notify({type = toastrTypes.error, msg = 'Something went wrong!', title = '', isFrozen = false}) {
        const toastrTitle = this.getToastrTitle(title, type);

        const toast = this.toastr[type](msg, toastrTitle);
        this.toasts.push(merge(toast, {isFrozen}));
    }

    getToastrTitle(title, msgType) {
        let toastrTitle = title;

        if (!title) {
            toastrTitle = msgTypes[msgType];
        }

        return toastrTitle;
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, NotificationsService)
    .name;
