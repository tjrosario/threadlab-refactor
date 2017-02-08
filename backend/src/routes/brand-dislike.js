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
  return apiUrl + "/brandDislike" + url + "&" + apiKey;
};

router.get("/findBy/customer", requireLogin, function(req, res) {
  var query;
  query = req.query;
  return request({
    uri: apiUrl + "/brandDislike/findBy/customer/" + req.session.userID + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    client.log(result, ['brandDislike', 'findBy', 'customer']);
    return res.status(200).send(result);
  });
});

router.post("/createAllJSON", function(req, res) {
  return request({
    uri: apiUrl + "/brandDislike/createAllJSON" + "?" + apiKey + "&" + querystring.stringify(query),
    body: JSON.stringify(req.body),
    method: "post"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    client.log(result, ['brandDislike', 'createAllJSON']);
    return res.status(200).send(result);
  });
});

router.get("/delete/:id", requireLogin, function(req, res) {
  var query = req.query;
  return request({
    uri: apiUrl + "/brandDislike/delete/" + req.params.id + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    client.log(result, ['brandDislike', 'delete']);
    return res.status(200).send(result);
  });
});

router.get("/create", requireLogin, function(req, res) {
  var query;
  query = req.query;
  query['customer.id'] = req.session.userID;
  return request({
    uri: apiUrl + "/brandDislike/create" + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    client.log(result, ['brandDislike', 'create']);
    return res.status(200).send(result);
  });
});

module.exports = router;
