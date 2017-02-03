const appConfig = {
    assetUrl: '',
    companyAddress: {
        name: 'ThreadLab, Inc.',
        address1: '335 9th Street',
        city: 'Jersey City',
        state: 'NJ',
        zip: '07302',
        phone: ' 866.208.5322'
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