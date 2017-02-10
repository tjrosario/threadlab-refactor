import angular from 'angular';
import _ from 'lodash';

const filterName = 'removeGeneric';

export const removeGeneric = () => {
    return input => {
        return input.replace('Generic', '').replace(/s$/i, '');
    };
};

export default angular.module(`filters.${filterName}`, [])
    .filter(filterName, removeGeneric)
    .name;