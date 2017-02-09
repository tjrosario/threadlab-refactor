/* @ngInject */
export default class MailchimpSignupForm {
    constructor(mailchimpService, mandrillService, notificationsService, CONFIG) {
        this.mailchimpService = mailchimpService;
        this.mandrillService = mandrillService;
        this.notificationsService = notificationsService;
        this.appConfig = CONFIG;
    }

    $onInit() {
        this.formData = {};
    }

    isRequiredFieldsValid() {
        return this.formData.EMAIL;
    }

    sendMandrillTemplate(opts) {
        opts.callback = opts.callback || (() => {});

        const companyAddress = this.appConfig.companyAddress;
        const address = `${companyAddress.name}<br>${companyAddress.address1}<br>${companyAddress.city}, ${companyAddress.state} ${companyAddress.zip}<br>${companyAddress.phone}`;

        const data = {
            template_name: 'order-preview-sample',
            message: {
                subject: 'Order Preview Sample',
                from_email: 'service@mythreadlab.com',
                from_name: 'ThreadLab',
                to: [{
                    email: this.formData.EMAIL,
                    type: 'to'
                }],
                merge_vars: [{
                    rcpt: this.formData.EMAIL,
                    vars: [{
                        name: 'LIST_ADDRESS_HTML',
                        content: address
                    }]
                }]
            }
        };

        this.mandrillService.sendTemplate({ data }).then(resp => opts.callback(resp));
    }

    subscribeToMailchimp() {
        const data = {
            id: this.appConfig.mailchimp.lists.postSignup,
            email: {
                email: this.formData.EMAIL
            },
            double_optin: false
        };

        this.mailchimpService.subscribe({ data })
            .then(resp => {
                if (resp.data.success) {
                    const email = this.formData.EMAIL;
                    const msg = `Your Sample Order Preview has been sent to ${email}`;
                    this.notificationsService.success({ msg });
                } else {
                    this.notificationsService.alert({ msg: resp.data.error });
                }
            }, err => {
                this.notificationsService.alert({ msg: err.message });
            });
    }

    submitMailChimp($event) {
        $event.preventDefault();
        const self = this;

        this.sendMandrillTemplate({
            callback() {
                self.subscribeToMailchimp();
            }
        });
    }
}
