export default class GenericModal {
    constructor() {
        this.title = this.resolve.title;
        this.text = this.resolve.text;
        this.confirmButtonLabel = this.resolve.confirmButtonLabel || 'Yes';
        this.declineButtonLabel = this.resolve.declineButtonLabel;
    }
}
