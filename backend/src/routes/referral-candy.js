var apiKey, apiUrl, client, config, crypto, express, loggly, querystring, referralCandyConfig, request, requireLogin, router;
express = require("express");
router = express.Router();
request = require("request");
config = require("../config/server/config.json");
querystring = require('querystring');
apiUrl = config.apiUrl;
apiKey = config.apiKey;
requireLogin = require("./require-login");
referralCandyConfig = config.referralCandy;
crypto = require('crypto');
loggly = require('loggly');
client = loggly.createClient(config.loggly);

router.get("/getSignature", function(req, res) {
  var data, hash, params;
  params = req.query;
  data = params.email + ',' + params.firstName + ',' + params.invoiceAmount + ',' + params.timestamp + ',' + referralCandyConfig.secretKey;
  hash = crypto.createHash('md5').update(data).digest('hex');
  res.json({
    success: true,
    data: hash
  });
  return client.log(hash, ['referralCandy', 'getSignature']);
});

module.exports = router;
