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
  return apiUrl + "/productCategory" + url + "&" + apiKey;
};

router.get("/list", function(req, res) {
  return request({
    uri: getAPIUrl(req.url),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    client.log(result, ['productCategory', 'list']);
    return res.status(200).send(result);
  });
});

/*
router.get "*", (req, res) ->
  request(getAPIUrl(req.url)).pipe res
 */

module.exports = router;
