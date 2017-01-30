var apiKey, apiUrl, client, config, express, getAPIUrl, loggly, querystring, request, requireLogin, router;
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

getAPIUrl = function(url) {
  return apiUrl + "/subscription" + url + "&" + apiKey;
};

router.get("/create", requireLogin, function(req, res) {
  var query;
  query = req.query;
  query['customer.id'] = req.session.userID;
  return request({
    uri: apiUrl + "/subscription/create/" + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    result.query = query;
    result.params = req.params;
    client.log(result, ['subscription', 'create']);
    return res.status(200).send(result);
  });
});

router.get("/update/:id", requireLogin, function(req, res) {
  var query;
  query = req.query;
  return request({
    uri: apiUrl + "/subscription/update/" + req.params.id + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    result.query = query;
    result.params = req.params;
    res.status(200).send(result);
    return client.log(result, ['subscription', 'update']);
  });
});

module.exports = router;
