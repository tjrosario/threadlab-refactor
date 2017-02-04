import angular from 'angular';
import { componentName as genericModalComponentName } from 'components/genericModal/component';

const directiveName = 'confirmBeforeAction';

export const confirmBeforeAction = ($uibModal) => {
    'ngInject';
    return {
        restrict: 'A',
        scope: {
            handler: '&confirmBeforeActionHandler',
            title: '=confirmBeforeActionTitle',
            text: '=confirmBeforeActionText',
            confirmLabel: '=confirmBeforeActionConfirmLabel',
            declineLabel: '=confirmBeforeActionDeclineLabel'
        },
        link: function (scope, element) {
            const handler = scope.handler ? scope.handler : () => {};

            element.on('click', () => {
                $uibModal.open({
                    animation: true,
                    component: genericModalComponentName,
                    resolve: {
                        text: () => scope.text || 'Are you sure?',
                        title: () => scope.title || 'Delete',
                        confirmButtonLabel: () => scope.confirmLabel || 'Yes',
                        declineButtonLabel: () => scope.declineLabel || 'No'
                    }
                }).result.then(handler);
            });
        },
    };
};

export default angular.module(`directives.${directiveName}`, [])
    .directive(directiveName, confirmBeforeAction)
    .name;