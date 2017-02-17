import find from 'lodash/find';

export default class Contact {
    constructor(contactService, mailService, CONFIG) {
        this.contactService = contactService;
        this.mailService = mailService;
        this.CONFIG = CONFIG;
    }

    $onInit() {
        this.formData = {};
        this.subjects = this.contactService.getSubjects();
        this.loadMap();
    }

    isRequiredFieldsValid() {
        return  this.formData.name &&
                this.formData.email &&
                this.formData.subject &&
                this.formData.message;
    }

    loadMap() {
        const assetUrl = this.CONFIG.assetUrl;

        const customOpts = {
            lat: 40.728535,
            lng: -74.04905500000001,
            pin: `${assetUrl}/images/map-pin.png`,
            title: 'ThreadLab, Inc.'
        };

        const mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(customOpts.lat, customOpts.lng)
        };

        const map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        const position = new google.maps.LatLng(customOpts.lat, customOpts.lng);

        const marker = new google.maps.Marker({
            position,
            map,
            icon: customOpts.pin,
            title: customOpts.title
        });
    }

    submit() {
        const subject = this.formData.subject;
        const toEmail = find(this.subjects, { title: subject }).email;

        const data = {
            from: this.formData.email,
            to: toEmail,
            subject: `ThreadLab Contact Form Submission: ${subject}`,
        };

        this.mailService.contact({ data })
            .then(resp => {
                if (resp.data.success) {
                    this.notificationsService.success({ msg: 'Thank you for your message. Someone from our team will be in touch shortly.' });
                    this.customer.addresses.push(resp.data.data);
                } else {
                    this.notificationsService.alert({ msg: resp.data.message });
                }
            }, err => {
                this.notificationsService.alert({ msg: err.message });
            });
    }
}