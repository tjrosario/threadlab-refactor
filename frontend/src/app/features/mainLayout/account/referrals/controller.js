/* @ngInject */
export default class AccountReferrals {
    constructor() {
        
    }

    $onInit() {
        this.initReferralCandy();
    }

    initReferralCandy() {
	    $('#refcandy-candyjar-js').remove();
	    return !(((d, s, id) => {
	      let fjs;
	      let js;
	      js = void 0;
	      fjs = d.getElementsByTagName(s)[0];
	      if (!d.getElementById(id)) {
	        js = d.createElement(s);
	        js.id = id;
	        js.src = '//portal.referralcandy.com/assets/widgets/refcandy-candyjar.js';
	        fjs.parentNode.insertBefore(js, fjs);
	      }
	    }))(document, 'script', 'refcandy-candyjar-js');
    }
}
