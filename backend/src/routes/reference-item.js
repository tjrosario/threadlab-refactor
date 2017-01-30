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
  return apiUrl + "/referenceItem" + url + "&" + apiKey;
};

router.get("/create", requireLogin, function(req, res) {
  var query;
  query = req.query;
  query['customer.id'] = req.session.userID;
  return request({
    uri: apiUrl + "/referenceItem/create" + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    client.log(result, ['referenceItem', 'create']);
    return res.status(200).send(result);
  });
});

router.get("/show/:id", requireLogin, function(req, res) {
  var query;
  query = req.query;
  return request({
    uri: apiUrl + "/referenceItem/show/" + req.params.id + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    client.log(result, ['referenceItem', 'show']);
    return res.status(200).send(result);
  });
});

router.get("/update/:id", requireLogin, function(req, res) {
  var query;
  query = req.query;
  return request({
    uri: apiUrl + "/referenceItem/update/" + req.params.id + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    client.log(result, ['referenceItem', 'update']);
    return res.status(200).send(result);
  });
});

router.get("/delete/:id", requireLogin, function(req, res) {
  return request({
    uri: getAPIUrl(req.url),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    client.log(result, ['referenceItem', 'delete']);
    return res.status(200).send(result);
  });
});

module.exports = router;
