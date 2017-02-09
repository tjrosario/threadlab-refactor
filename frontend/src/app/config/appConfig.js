const appConfig = {
    adroll: {
        adroll_adv_id: '5NAD7REW35GGLB3L5J63HS',
        adroll_pix_id: 'OMW3NBIEXNASJH3VICRCRI',
        adroll_segments: '172ab867'
    },
    assetUrl: '',
    companyAddress: {
        name: 'ThreadLab, Inc.',
        address1: '335 9th Street',
        city: 'Jersey City',
        state: 'NJ',
        zip: '07302',
        phone: ' 866.208.5322'
    },
    email: {
        accounts: {
            alerts: 'alerts@mythreadlab.com'
        },
        feedback: {
            to: 'service@mythreadlab.com',
            subject: 'ThreadLab: Order Feedback'
        },
        orderCancel: {
            to: 'service@mythreadlab.com',
            subject: 'ThreadLab: Order Cancelled'
        },
        orderNoMatches: {
            to: 'service@mythreadlab.com',
            subject: 'ThreadLab: Complete Whiff'
        },
        orderCategoryNoMatches: {
            to: 'service@mythreadlab.com',
            subject: 'ThreadLab: Partial Whiff'
        },
        service: 'service@mythreadlab.com'
    },
    facebook: {
        appId: "500393423427790",
        pixelId: "315810798543477"
    },
    mailchimp: {
        baseUrl: "/mailchimp",
        lists: {
            postSignup: '0f21534432'
        },
        goals: {
            id: '6a303cfff4a8e19ce0b191c36'
        }
    },
    mandrill: {
        baseUrl: "/mandrill"
    },
    paypal: {
        enabled: true,
        checkout: {
            action: 'https://www.sandbox.paypal.com/cgi-bin/webscr',
            hosted_button_id: '8W3LPVYKN4SMN',
            business: 'paypal-merchant@mythreadlab.com'
        }
    },
    socialSharing: {
        text: "ThreadLab.  Men's clothing.  Easier.",
        hashtags: "threadlab, mensshopping, mensclothing, menswear, personalshopper, personalshopping, mensfashion, men, clothes, outfit, startup",
        url: 'https://www.mythreadlab.com' 
    },
    stripe: {
        baseUrl: "/stripe",
        keyPublish: "pk_test_ODLxP7LKU46YQ3b3JKQWb6Rr",
        charges: {
            receipt_email: 'service@mythreadlab.com'
        }
    }
};

export { appConfig };