var apiKey, apiUrl, client, config, express, getAPIUrl, loggly, querystring, request, requireLogin, router;
express = require("express");
router = express.Router();
request = require("request");
config = require("../config/server/config.json");
apiUrl = config.apiUrl;
apiKey = config.apiKey;
querystring = require('querystring');
requireLogin = require("./require-login");
loggly = require('loggly');
client = loggly.createClient(config.loggly);

getAPIUrl = function(url) {
  return apiUrl + "/productPreference" + url + "&" + apiKey;
};

/*
router.get "*", (req, res) ->
  request(getAPIUrl(req.url)).pipe res
 */

router.post("/createAllJSON", function(req, res) {
  return request({
    uri: getAPIUrl(req.url),
    body: JSON.stringify(req.body),
    method: "post"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    client.log(result, ['productPreference', 'createAllJSON']);
    return res.status(200).send(result);
  });
});

router.get("/delete/:id", requireLogin, function(req, res) {
  return request({
    uri: apiUrl + "/productPreference/delete/" + req.params.id + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    client.log(result, ['productPreference', 'delete']);
    return res.status(200).send(result);
  });
});

router.get("/create", requireLogin, function(req, res) {
  var query;
  query = req.query;
  query['customer.id'] = req.session.userID;
  return request({
    uri: apiUrl + "/productPreference/create" + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    client.log(result, ['productPreference', 'create']);
    return res.status(200).send(result);
  });
});

module.exports = router;
