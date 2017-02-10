import angular from 'angular';
import _ from 'lodash';

const filterName = 'trusted';

export const trusted = ($sce) => {
    return url => {
        return $sce.trustAsResourceUrl(url);
    };
};

export default angular.module(`filters.${filterName}`, [])
    .filter(filterName, trusted)
    .name;