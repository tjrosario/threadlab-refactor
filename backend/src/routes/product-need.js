var apiKey, apiUrl, client, config, express, getAPIUrl, loggly, request, requireLogin, router;
express = require("express");
router = express.Router();
request = require("request");
config = require("../config/server/config.json");
apiUrl = config.apiUrl;
apiKey = config.apiKey;
requireLogin = require("./require-login");
loggly = require('loggly');
client = loggly.createClient(config.loggly);

getAPIUrl = function(url) {
  return apiUrl + "/productNeed" + url + "&" + apiKey;
};

router.use(requireLogin);

router.post("/createAllJSON", function(req, res) {
  return request({
    uri: getAPIUrl(req.url),
    body: JSON.stringify(req.body),
    method: "post"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    client.log(result, ['productNeed', 'createAllJSON']);
    return res.status(200).send(result);
  });
});

module.exports = router;
