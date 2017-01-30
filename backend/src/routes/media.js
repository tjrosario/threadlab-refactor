var apiKey, apiUrl, client, config, express, getAPIUrl, loggly, request, router;
express = require("express");
router = express.Router();
request = require("request");
config = require("../config/server/config.json");
apiUrl = config.apiUrl;
apiKey = config.apiKey;
loggly = require('loggly');
client = loggly.createClient(config.loggly);


getAPIUrl = function(url) {
  return apiUrl + "/media" + url + "&" + apiKey;
};

router.get("/catalog", function(req, res) {
  var s3Bucket = 's3.amazonaws.com/threadlab-catalog-production';
  var url = req.query.url.replace(s3Bucket, config.catalogCDN);

  
});

module.exports = router;

