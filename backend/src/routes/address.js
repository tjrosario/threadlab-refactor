var apiKey, apiUrl, client, config, express, getAPIUrl, loggly, querystring, request, requireLogin, router;
express = require("express");
router = express.Router();
request = require("request");
config = require("../config/server/config.json");
apiUrl = config.apiUrl;
apiKey = config.apiKey;
requireLogin = require("./require-login");
querystring = require('querystring');
loggly = require('loggly');
client = loggly.createClient(config.loggly);

getAPIUrl = function(url) {
  return apiUrl + "/address" + url + "&" + apiKey;
};

router.use(requireLogin);

router.get("/create", requireLogin, function(req, res) {
  var query = req.query;
  return request({
    uri: apiUrl + "/address/create/" + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    client.log(result, ['address', 'create']);
    return res.status(200).send(result);
  });
});

router.get("/show/:id", requireLogin, function(req, res) {
  var query = req.query;
  return request({
    uri: apiUrl + "/address/show/" + req.params.id + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    client.log(result, ['address', 'show']);
    return res.status(200).send(result);
  });
});

router.get("/update/:id", requireLogin, function(req, res) {
  var query = req.query;
  return request({
    uri: apiUrl + "/address/update/" + req.params.id + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    client.log(result, ['address', 'update']);
    return res.status(200).send(result);
  });
});

router.get("/delete/:id", requireLogin, function(req, res) {
  var query = req.query;
  return request({
    uri: apiUrl + "/address/delete/" + req.params.id + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    client.log(result, ['address', 'delete']);
    return res.status(200).send(result);
  });
});

module.exports = router;

