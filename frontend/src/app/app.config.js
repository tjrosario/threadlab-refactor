import { httpInterceptors } from './httpInterceptors';
import merge from 'lodash/merge';

export default function appConfig($urlRouterProvider, $locationProvider, $httpProvider, cfpLoadingBarProvider, toastrConfig, $compileProvider, localStorageServiceProvider, UIRouterMetatagsProvider, optimizelyProvider, KeepaliveProvider, IdleProvider, TitleProvider, $analyticsProvider, CONFIG) {
    'ngInject';

    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
    $httpProvider.interceptors.push(httpInterceptors);
    $compileProvider.debugInfoEnabled(false);
    localStorageServiceProvider.setPrefix('threadlab');
    localStorageServiceProvider.setStorageType('localStorage');

    $analyticsProvider.withBase(true);

    IdleProvider.idle(CONFIG.session.idle);
    IdleProvider.timeout(CONFIG.session.timeout);
    KeepaliveProvider.interval(CONFIG.session.interval);
    TitleProvider.enabled(false);

    UIRouterMetatagsProvider
        .setTitlePrefix('')
        .setTitleSuffix(" | ThreadLab.  Men's clothing.  Easier.")
        .setDefaultTitle("ThreadLab.  Men's clothing.  Easier.")
        .setDefaultDescription("Personal Shopping Service for Busy Guys - we focus on Fit, Convenience and Pricing.  Make life easier with ThreadLab. Affordable men's clothing from 50 + brands with zero shopping required.")
        .setDefaultKeywords('Affordable Personal Shopper, Mens Clothing, Menswear, Personal Shopping, Trunk Club Competitors')
        .setStaticProperties({
                'author': 'ThreadLab, Inc.',
                'fb:app_id': 'your fb app id',
                'og:site_name': 'ThreadLab',
                'og:image': 'https://www.mythreadlab.com/images/facebook/box-149.png',
                'og:description': "Personal Shopping Service for Busy Guys - we focus on Fit, Convenience and Pricing.  Make life easier with ThreadLab. Affordable men's clothing from 50 + brands with zero shopping required."

            })
        .setOGURL(true);

    optimizelyProvider.setKey(CONFIG.optimizely.key);
    optimizelyProvider.setActivationEventName(false);

    merge(toastrConfig, {
        autoDismiss: false,
        containerId: 'toast-container',
        maxOpened: 0,
        newestOnTop: true,
        positionClass: 'toast-top-right',
        preventDuplicates: false,
        preventOpenDuplicates: false,
        target: 'body',
        closeButton: true,
        timeOut: 10000,
        progressBar: true,
        titleClass: 'toast-title',
        toastClass: 'toast'
    });
}

