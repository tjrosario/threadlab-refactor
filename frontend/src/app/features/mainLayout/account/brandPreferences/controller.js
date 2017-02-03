import cloneDeep from 'lodash/cloneDeep';
import filter from 'lodash/filter';
import each from 'lodash/each';

/* @ngInject */
export default class AccountBrandPreferences {
    constructor(customer, brands, notificationsService) {
        this.customer = customer[0].data.data;
        this.brands = brands[0].data.data.brands;
        this.brandDislikes = this.customer.brandDislikes;
        this.notificationsService = notificationsService;
    }

    $onInit() {
    	this.brandPreferences = this.prepareBrandPreferencesData();
        this.limit = this.brandPreferences.length - 1;
    }

    prepareBrandPreferencesData() {
        let brands = cloneDeep(this.brands);
        const brandDislikes = cloneDeep(this.brandDislikes);
        let brandPreferences = [];

        brands = filter(brands, brand => {
            return brand.status === 'active';
        });

        each(brands, brand => {
            each(brandDislikes, dislike => {
                if (dislike.brand.name === brand.name) {
                    brand.brandPreference = dislike;
                    brand.selected = true;
                }
            });
            brandPreferences.push(brand);
        });

        brandPreferences = brandPreferences.sort(this.sortByName);

        return brandPreferences;
    }

    toggleSelection(brand) {
        
    }

    sortByName(a, b) {
        if (a.name < b.name) {
          return -1;
        }

        if (a.name > b.name) {
          return 1;
        }

        return 0;
    }
}
