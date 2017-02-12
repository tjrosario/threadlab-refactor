import map from 'lodash/map';
import cloneDeep from 'lodash/cloneDeep';

/* @ngInject */
export default class PlaceOrderConfirmation {
    constructor(order, CONFIG, userModel, customerService, referralCandyService, boxesService) {
        this.order = order[0].data.data;
        this.appConfig = CONFIG;
        this.userModel = userModel;
        this.customerService = customerService;
        this.currentUser = this.userModel.loggedUser;
        this.referralCandyService = referralCandyService;
        this.boxesService = boxesService;
    }

    $onInit() {
        this.order.categories = this.getCategories(this.order);
        this.trackReferralCandy();
        this.sendTracking();
    }

    getCategories(data) {
        const result = cloneDeep(data);

        const categories = map(result.productNeeds, (v, k) => {
            return v.productCategory.name.replace(RegExp(" ", "g"), "");
        }).join(',');

        return categories;
    }

    sendTracking() {
        this.trackGAEcommerce(this.order);
        this.trackOrderConversion(this.order);
    }

    trackGAEcommerce(order) {
    }

    trackOrderConversion(order) {
        
    }

    trackReferralCandy() {
        const timestamp = Math.floor(Date.now() / 1000);
        const config = {
            params: {
                email: this.currentUser.email,
                firstName: this.currentUser.firstName,
                invoiceAmount: this.order.invoiceValue,
                timestamp
            }
        };

        this.referralCandyService.getSignature({ config })
            .then(resp => {
                if (resp.data.success) {
                    this.sendReferralCandyReceipt();
                    this.trackReferralCandyType();
                }
            });
    }

    trackReferralCandyType() {
        const rcID = this.appConfig.referralCandy.postPurchase.id;
        switch (rcID) {
            case 'refcandy-popsicle':
                this.trackRCPurchasePopup();
                break;
            case 'refcandy-mint':
                this.trackRCPurchase();
                break;
        }
    }

    sendReferralCandyReceipt() {
        const invoiceValue = this.order.invoiceValue;
        const now = new Date().toISOString();
        const timestamp = this.rfcFormat(now, true);

        const params = {
            firstName: this.currentUser.firstName,
            lastName: this.currentUser.lastName,
            email: this.currentUser.email,
            invoiceValue: `${invoiceValue} USD`,
            timestamp,
            orderNumber: this.order.orderNumber
        };

        this.customerService.receipt({ params });
    }

    rfcFormat(dateString, inWithSecs) {
        let outString, theAP, theDate, theHours, theMins, theMonth, tmpDate, withSecs;
        
        if (!dateString) {
            return '';
        }

        if (dateString.match(/31 Dec 1969/)) {
            return '';
        }

        withSecs = inWithSecs || false;
        tmpDate = new Date(dateString);
        theHours = tmpDate.getHours();
        theAP = void 0;

        if (theHours > 12 || theHours === 12) {
            theAP = 'PM';
            theHours = theHours - 12;
        } else {
            theAP = 'AM';
        }

        if (theHours === 0) {
            theHours = 12;
        }

        theMins = (tmpDate.getMinutes() < 10 ? '0' : '') + tmpDate.getMinutes();

        if (withSecs) {
            theMins += `:${tmpDate.getSeconds() < 10 ? '0' : ''}${tmpDate.getSeconds()}`;
        }

        theDate = (tmpDate.getDate() < 10 ? '0' : '') + tmpDate.getDate();
        theMonth = tmpDate.getMonth() + 1;
        outString = `${theMonth < 10 ? '0' + theMonth : theMonth}/${theDate}/${tmpDate.getFullYear()} ${theHours}:${theMins} ${theAP}`;

        return outString;
    }

    trackRCPurchasePopup() {
        ((e => {
          let a;
          let c;
          let d;
          let f;
          let h;
          let i;
          let l;
          let n;
          let o;
          let p;
          let r;
          let s;
          let t;
          let u;
          let v;
          let z;
          t = void 0;
          n = void 0;
          r = void 0;
          i = void 0;
          s = void 0;
          o = void 0;
          u = void 0;
          a = void 0;
          f = void 0;
          l = void 0;
          c = void 0;
          h = void 0;
          p = void 0;
          d = void 0;
          v = void 0;
          z = 'script';
          l = 'refcandy-purchase-js';
          c = 'refcandy-popsicle';
          p = 'go.referralcandy.com/purchase/';
          t = 'data-app-id';
          r = {
            email: 'a',
            fname: 'b',
            lname: 'c',
            amount: 'd',
            currency: 'e',
            'accepts-marketing': 'f',
            timestamp: 'g',
            'referral-code': 'h',
            locale: 'i',
            'external-reference-id': 'k',
            signature: 'ab'
          };
          i = e.getElementsByTagName(z)[0];
          s = (e, t) => {
            if (t) {
              return `${e}=${encodeURIComponent(t)}`;
            } else {
              return '';
            }
          };
          d = e => `${p}${h.getAttribute(t)}.js?lightbox=1&aa=75&`;
          if (!e.getElementById(l)) {
            h = e.getElementById(c);
            if (h) {
              o = e.createElement(z);
              o.id = l;
              a = ((() => {
                'var e';
                e = void 0;
                e = [];
                for (n in r) {
                  'n = n';
                  u = r[n];
                  v = h.getAttribute(`data-${n}`);
                  e.push(s(u, v));
                }
                return e;
              }))();
              o.src = `https://${d(h.getAttribute(t))}${a.join('&')}`;
              return i.parentNode.insertBefore(o, i);
            }
          }
        }))(document);
    }

    trackRCPurchase() {
        ((e => {
          let a;
          let c;
          let d;
          let f;
          let h;
          let i;
          let l;
          let n;
          let o;
          let p;
          let r;
          let s;
          let t;
          let u;
          let v;
          let z;
          t = void 0;
          n = void 0;
          r = void 0;
          i = void 0;
          s = void 0;
          o = void 0;
          u = void 0;
          a = void 0;
          f = void 0;
          l = void 0;
          c = void 0;
          h = void 0;
          p = void 0;
          d = void 0;
          v = void 0;
          z = 'script';
          l = 'refcandy-purchase-js';
          c = 'refcandy-mint';
          p = 'go.referralcandy.com/purchase/';
          t = 'data-app-id';
          r = {
            email: 'a',
            fname: 'b',
            lname: 'c',
            amount: 'd',
            currency: 'e',
            'accepts-marketing': 'f',
            timestamp: 'g',
            'referral-code': 'h',
            locale: 'i',
            'external-reference-id': 'k',
            signature: 'ab'
          };
          i = e.getElementsByTagName(z)[0];
          s = (e, t) => {
            if (t) {
              return `${e}=${encodeURIComponent(t)}`;
            } else {
              return '';
            }
          };
          d = e => `${p}${h.getAttribute(t)}.js?aa=75&`;
          if (!e.getElementById(l)) {
            h = e.getElementById(c);
            if (h) {
              o = e.createElement(z);
              o.id = l;
              a = ((() => {
                'var e';
                e = void 0;
                e = [];
                for (n in r) {
                  'n = n';
                  u = r[n];
                  v = h.getAttribute(`data-${n}`);
                  e.push(s(u, v));
                }
                return e;
              }))();
              //o.src = `${e.location.protocol}//${d(h.getAttribute(t))}${a.join('&')}`;
              o.src = `${e.location.protocol}`
              return i.parentNode.insertBefore(o, i);
            }
          }
        }))(document);
    }
}
