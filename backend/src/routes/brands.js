var apiKey, apiUrl, client, config, express, getAPIUrl, loggly, request, router, querystring;
express = require("express");
router = express.Router();
request = require("request");
querystring = require('querystring');
config = require("../config/server/config.json");
apiUrl = config.apiUrl;
apiKey = config.apiKey;
loggly = require('loggly');
client = loggly.createClient(config.loggly);

getAPIUrl = function(url) {
  return apiUrl + "/brand" + url + "&" + apiKey;
};

router.get("/list", function(req, res) {
  var query = req.query;
  return request({
    uri: apiUrl + '/brand/list' + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    client.log(result, ['brand', 'list']);
    return res.status(200).send(result);
  });
});

module.exports = router;
