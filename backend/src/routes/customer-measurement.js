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
  return apiUrl + "/customerMeasurement" + url + "&" + apiKey;
};

router.get("/update/:id", requireLogin, function(req, res) {
  var query = req.query;
  return request({
    uri: apiUrl + "/customerMeasurement/update/" + req.params.id + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    client.log(result, ['customerMeasurement', 'update']);
    return res.status(200).send(result);
  });
});

router.get("/delete/:id", requireLogin, function(req, res) {
  var query = req.query;
  return request({
    uri: apiUrl + "/customerMeasurement/delete/" + req.params.id + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    client.log(result, ['customerMeasurement', 'delete']);
    return res.status(200).send(result);
  });
});

router.get("/create", requireLogin, function(req, res) {
  var query;
  query = req.query;
  query['customer.id'] = req.session.userID;
  
  return request({
    uri: apiUrl + "/customerMeasurement/create" + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    client.log(result, ['customerMeasurement', 'create']);
    return res.status(200).send(result);
  });
});

module.exports = router;
