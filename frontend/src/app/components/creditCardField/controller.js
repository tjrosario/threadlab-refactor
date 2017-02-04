/* @ngInject */
export default class CreditCardField {
    constructor(Cards) {
        this.Cards = Cards;
        this.cardType = '';
    }

    validateCreditCard(e) {
    	let ref;
    	const digit = String.fromCharCode(e.which);
    	const $target = angular.element(e.currentTarget);
    	const value = $target.val();
    	const cardType = (ref = this.Cards.fromNumber(value + digit)) !== null ? ref.type : void 0;

    	this.cardType = cardType;
    }
}
