import cloneDeep from 'lodash/cloneDeep';
import filter from 'lodash/filter';
import each from 'lodash/each';

/* @ngInject */
export default class AccountBrandPreferences {
    constructor(customer, brands, brandDislikeService, notificationsService) {
        this.customer = customer[0].data.data;
        this.brands = brands[0].data.data.brands;
        this.brandDislikes = this.customer.brandDislikes;
        this.brandDislikeService = brandDislikeService;
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
            brand.selected = false;
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
        if (brand.selected) {
            this.removeBrandDislike(brand);
        } else {
            this.addBrandDislike(brand);
        }
    }

    removeBrandDislike(brand) {
        const id = brand.brandPreference.id;

        this.brandDislikeService.deleteEntity({ id })
            .then(resp => {
                if (resp.data.success) {
                    this.notificationsService.success({ msg: 'Brand Preference Updated' });
                    brand.selected = false;
                } else {
                    this.notificationsService.alert({ msg: resp.data.message });
                }
            }, err => {
                this.notificationsService.alert({ msg: err.message });
            });
    }

    addBrandDislike(brand) {
        const config = {
            params: {
                'brand.id': brand.id
            }
        };

        this.brandDislikeService.createEntity({ config })
            .then(resp => {
                if (resp.data.success) {
                    this.notificationsService.success({ msg: 'Brand Preference Updated' });
                    brand.selected = true;
                    brand.brandPreference = resp.data.data;
                } else {
                    this.notificationsService.alert({ msg: resp.data.message });
                }
            }, err => {
                this.notificationsService.alert({ msg: err.message });
            });
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
