const appConfig = {
    adroll: {
        adroll_adv_id: '5NAD7REW35GGLB3L5J63HS',
        adroll_pix_id: 'OMW3NBIEXNASJH3VICRCRI',
        adroll_segments: '172ab867'
    },
    analytics: {
        google: {
            id: ''
        },
        googleTagManager: {
            id: ''
        },
        googleAdWords: {
            google_conversion_id: "",
            google_conversion_language: "",
            google_conversion_format: "",
            google_conversion_color: "",
            google_remarketing_only: ""
        }
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
    crazyegg: {
        id: "00471513"
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
    optimizely: {
        key: '4944590672'
    },
    paypal: {
        enabled: true,
        checkout: {
            action: 'https://www.sandbox.paypal.com/cgi-bin/webscr',
            hosted_button_id: '8W3LPVYKN4SMN',
            business: 'paypal-merchant@mythreadlab.com'
        }
    },
    referralCandy: {
        appId: 'jo6f4uuu03r4290hhp6greydx',
        baseUrl: '/referralCandy',
        postPurchase: {
            id: 'refcandy-popsicle'
        }
    },
    session: {
        idle: 1200,
        timeout: 120,
        interval: 2
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