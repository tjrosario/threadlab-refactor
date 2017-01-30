var apiKey, apiUrl, client, config, express, loggly, querystring, request, requireLogin, router;
express = require("express");
router = express.Router();
request = require("request");
querystring = require('querystring');
config = require("../config/server/config.json");
apiUrl = config.apiUrl;
apiKey = config.apiKey;
requireLogin = require("./require-login");
loggly = require('loggly');
client = loggly.createClient(config.loggly);

router.post("/violation", function(req, res) {
  console.log('@@@@@@@@@@@@@ INCOMING VIOLATION @@@@@@@@@@:');
  return console.log(req);
});

module.exports = router;
