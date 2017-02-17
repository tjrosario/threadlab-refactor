export default class PromoDetails {
    constructor(promo, localStorageService) {
    	this.promo = promo.data.data;
    	this.localStorageService = localStorageService;
    }

    $onInit() {
    	if (this.promo) {
    		if (this.promo.status === 'active') {
				const startDate = new Date(this.promo.startDate);
				const endDate = new Date(this.promo.endDate);
				const today = new Date();

				if (startDate > today) {
					this.promoPending = true;
				} else if (endDate < today) {
					this.promoExpired = true;
				} else {
					this.promoValid = true;
					this.localStorageService.cookie.set('threadlabPromoCode', JSON.stringify(this.promo.name));
				}
    		} else {
    			this.promoValid = false;
    		}
    	} else {
    		this.promoValid = false;
    	}
    }
}