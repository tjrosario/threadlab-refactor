var path = require('path');
var fs = require('fs');
var express = require('express');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackConfig = require('../../webpack.dev.config.js');
var config = require('./config/server/config.json');
var csp = require('./config/server/csp.json');
var assetUrl = config.assetUrl;

var app = express();
var environment = app.get('env');
var DIST_DIR = path.join(process.cwd(), assetUrl);
var HTML_FILE = path.join(DIST_DIR, 'index.html');
var isDevelopment = environment !== 'production';
var webpackCompiler = webpack(webpackConfig);

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

if (isDevelopment) {  
  app.use(webpackDevMiddleware(webpackCompiler, {
      publicPath: webpackConfig.output.publicPath
  }));

  app.use(webpackHotMiddleware(webpackCompiler));

  console.log(HTML_FILE);

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
  app.use(express.static(DIST_DIR));
  app.get('*', function (req, res) {
      return res.sendFile(HTML_FILE);
  });
}

app.listen(app.get('port'));
