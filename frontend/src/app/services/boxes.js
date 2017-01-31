import angular from 'angular';
import find from 'lodash/find';

const serviceName = 'boxes';

/* @ngInject */
class BoxesService {
    constructor() {
        'ngInject';
    }

    getEntity({id, config = {}}) {
        var entities = this.getEntities().A;
        return find(entities.list, {
          slug: id
        });
    }

    getEntities() {
        return {
            A: {
              campaign: 'Box-Pick-99-149-299',
              list: [
                {
                  description: "2 - 4 Items",
                  imagePath: "/images/brandingPhotos/box-99.png",
                  imagePathAlt: "/images/pricing/box-starter.png",
                  numCategories: 3,
                  price: 99,
                  value: 150,
                  title: 'Starter',
                  slug: 'starter'
                }, {
                  description: "3 - 5 Items",
                  bestSeller: true,
                  imagePath: "/images/brandingPhotos/box-149.png",
                  imagePathAlt: "/images/pricing/box-medium.png",
                  numCategories: 5,
                  price: 149,
                  value: 250,
                  title: 'Essentials',
                  slug: 'essentials'
                }, {
                  description: "5 - 8 Items",
                  imagePath: "/images/brandingPhotos/box-299.png",
                  imagePathAlt: "/images/pricing/box-fullkit.png",
                  numCategories: 7,
                  price: 299,
                  value: 450,
                  title: 'Full Kit',
                  slug: 'full-kit'
                }
              ]
            },

            B: {
              campaign: 'Box-Pick-69-149-299',
              list: [
                {
                  description: "1 - 4 items",
                  imagePath: "/images/brandingPhotos/box-99.png",
                  numCategories: 2,
                  price: 69,
                  title: 'A starter box budget'
                }, {
                  description: "3 - 5 items",
                  bestSeller: true,
                  imagePath: "/images/brandingPhotos/box-149.png",
                  numCategories: 5,
                  price: 149,
                  title: 'A medium box budget'
                }, {
                  description: "5 - 8 items",
                  imagePath: "/images/brandingPhotos/box-299.png",
                  numCategories: 7,
                  price: 299,
                  title: 'A full kit budget'
                }
              ]
            }
        };
    }
}

export default angular.module(`services.${serviceName}`, [])
    .service(`${serviceName}Service`, BoxesService)
    .name;