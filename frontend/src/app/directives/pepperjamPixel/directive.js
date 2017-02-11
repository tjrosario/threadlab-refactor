import angular from 'angular';
import template from './view.html';

const directiveName = 'pepperjamPixel';

export const checkboxList = ($sce) => {
    'ngInject';
    return {
        restrict: 'E',
        scope: {
            programId: '@',
            orderId: '@',
            itemId: '@',
            itemPrice: '@',
            quantity: '@',
            category: '@',
            coupon: '@'
        },
        template,
        link(scope, element, attr) {
            let url = '';
            scope.programId = '8528';

            scope.$watch('category', newValue => {
                if (newValue) {
                    scope.itemPrice = parseFloat(scope.itemPrice).toFixed(2);
                    url = 'https://t.pepperjamnetwork.com/track?INT=DYNAMIC&PROGRAM_ID=' + scope.programId + '&ORDER_ID=' + scope.orderId + '&ITEM_ID1=' + scope.itemId + '&ITEM_PRICE1=' + scope.itemPrice + '&QUANTITY1=' + scope.quantity + '&CATEGORY1=' + scope.category + '&COUPON=' + scope.coupon;

                    scope.trustedUrl = $sce.trustAsResourceUrl(url);
                }
            });
        }
    };
};

export default angular.module(`directives.${directiveName}`, [])
    .directive(directiveName, checkboxList)
    .name;