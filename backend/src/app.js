var http = require("http");
var https = require('https');
var path = require('path');
var fs = require('fs');
var express = require('express');
var app = express();
var session = require('express-session');
var serveStatic = require('serve-static');
var config = require('./config/server/config.json');
var csp = require('./config/server/csp.json');

var compression = require('compression');
var router = express.Router();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csrf = require('csurf');
var winston = require('winston');
require('winston-loggly');
var helmet = require('helmet');
var contentLength = require('express-content-length-validator');
var hpp = require('hpp');
var MAX_CONTENT_LENGTH_ACCEPTED = config.MAX_CONTENT_LENGTH_ACCEPTED;


var assetUrl = config.assetUrl;
var environment = app.get('env');
var isDevelopment = environment !== 'production';
var DIST_DIR = path.join(process.cwd(), assetUrl);
var HTML_FILE = path.join(DIST_DIR, 'index.html');


//webpack
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackConfig = require('../../webpack.dev.config.js');
var webpackCompiler = webpack(webpackConfig);

//routes
var addressRoutes = require('./routes/address');
var accountRoutes = require('./routes/account');
var adminRoutes = require('./routes/admin');
var attributeRoutes = require('./routes/attribute');
var authRoutes = require('./routes/auth');
var brandDislikeRoutes = require('./routes/brand-dislike');
var brandPrefRoutes = require('./routes/brand-preference');
var brandRoutes = require('./routes/brands');
var customerRoutes = require('./routes/customer');
var customerMeasurementRoutes = require('./routes/customer-measurement');
var dimensionRoutes = require('./routes/dimension');
var giftCardRoutes = require('./routes/gift-card');
var giftCardOrderRoutes = require('./routes/gift-card-order');
var healthCheckRoutes = require('./routes/health-check');
var mailRoutes = require('./routes/mail');
var mailchimpRoutes = require('./routes/mailchimp');
var mandrillRoutes = require('./routes/mandrill');
var mediaRoutes = require('./routes/media');
var measurementPrefRoutes = require('./routes/measurement-preference');
var noteRoutes = require('./routes/note');
var orderRoutes = require('./routes/order');
var orderItemRoutes = require('./routes/order-item');
var paypalRoutes = require('./routes/paypal');
var pricePrefRoutes = require('./routes/price-preference');
var priceRangeRoutes = require('./routes/price-range');
var productRoutes = require('./routes/product');
var productCatRoutes = require('./routes/product-category');
var productNeedRoutes = require('./routes/product-need');
var productPrefRoutes = require('./routes/product-preference');
var promoRoutes = require('./routes/promo');
var referenceItemRoutes = require('./routes/reference-item');
var referralCandyRoutes = require('./routes/referral-candy');
var sizeRoutes = require('./routes/size');
var stripeRoutes = require('./routes/stripe');
var subscriptionRoutes = require('./routes/subscription');
var styleDislikeRoutes = require('./routes/style-dislike');
var virtualOrderItemRoutes = require('./routes/virtual-order-item');

var caFiles = config.ssl.certificates.ca;
var ca = (function() {
  var i, len, results;
  results = [];
  for (i = 0, len = caFiles.length; i < len; i++) {
    file = caFiles[i];
    results.push(fs.readFileSync("" + file));
  }
  return results;
})();

var server = {
  http: {
    port: process.env.PORT || config.server.http.port
  },
  https: {
    port: process.env.PORTSSL || config.server.https.port,
    options: {
      ca: ca,
      key: fs.readFileSync(config.ssl.certificates.key),
      cert: fs.readFileSync(config.ssl.certificates.cert),
      passphrase: config.ssl.certificates.passphrase
    }
  }
};


app.set('port', server.http.port);
app.use(helmet.xssFilter({
  setOnOldIE: true
}));
app.use(helmet.hidePoweredBy());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.noCache());
app.use(compression());
app.use(contentLength.validateMax({
  max: MAX_CONTENT_LENGTH_ACCEPTED,
  status: 400,
  message: 'stop it!'
}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: "keyboard cat",
  saveUninitialized: true,
  resave: true
}));
app.use(hpp());

app.use('/address', addressRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/attribute', attributeRoutes);
app.use('/brand', brandRoutes);
app.use('/brandDislike', brandDislikeRoutes);
app.use('/brandPreference', brandPrefRoutes);
app.use('/customer', customerRoutes);
app.use('/customerMeasurement', customerMeasurementRoutes);
app.use('/dimension', dimensionRoutes);
app.use('/giftCard', giftCardRoutes);
app.use('/giftCardOrder', giftCardOrderRoutes);
app.use('/healthCheck', healthCheckRoutes);
app.use('/mail', mailRoutes);
app.use('/mailchimp', mailchimpRoutes);
app.use('/mandrill', mandrillRoutes);
app.use('/media', mediaRoutes);
app.use('/measurementPreference', measurementPrefRoutes);
app.use('/myaccount', accountRoutes);
app.use('/note', noteRoutes);
app.use('/order', orderRoutes);
app.use('/orderItem', orderItemRoutes);
app.use('/paypal', paypalRoutes);
app.use('/pricePreference', pricePrefRoutes);
app.use('/priceRange', priceRangeRoutes);
app.use('/product', productRoutes);
app.use('/productCategory', productCatRoutes);
app.use('/productNeed', productNeedRoutes);
app.use('/productPreference', productPrefRoutes);
app.use('/promo', promoRoutes);
app.use('/referenceItem', referenceItemRoutes);
app.use('/referralCandy', referralCandyRoutes);
app.use('/size', sizeRoutes);
app.use('/stripe', stripeRoutes);
app.use('/styleDislike', styleDislikeRoutes);
app.use('/subscription', subscriptionRoutes);
app.use('/virtualOrderItem', virtualOrderItemRoutes);


app.use("/", serveStatic(path.join(process.cwd(), 'frontend/src/assets'), {
  maxAge: '30m'
}));

https.createServer(server.https.options, app).listen(server.https.port);

if (isDevelopment) {    
  app.use(webpackDevMiddleware(webpackCompiler, {
      publicPath: webpackConfig.output.publicPath
  }));

  app.use(webpackHotMiddleware(webpackCompiler));

  app.get('*', function (req, res, next) {
      webpackCompiler.outputFileSystem.readFile(HTML_FILE, function(err, result) {
        if (err) {
            return next(err);
        }
        res.set('content-type', 'text/html');
        res.send(result);
        res.end();
      });
  });
} else {
  require('newrelic');
  app.use(express.static(DIST_DIR));
  app.get('*', function (req, res) {
      return res.sendFile(HTML_FILE);
  });
  http.createServer(app).listen(server.http.port);
}

app.listen(app.get('port'));
