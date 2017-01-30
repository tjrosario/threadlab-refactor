var apiKey, apiUrl, config, express, getAPIUrl, loggly, request, router, querystring, requireAdmin;
express = require("express");
router = express.Router();
request = require("request");
config = require("../config/server/config.json");
apiUrl = config.apiUrl;
apiKey = config.apiKey;
loggly = require('loggly');
querystring = require('querystring');
requireAdmin = require('./require-admin');

router.get("/customer/find", function(req, res) {
  var query = req.query;
  request({
    uri: apiUrl + "/customer/find/" + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    res.status(200).send(result);
  });
});

router.get("/customer/show/:id", function(req, res) {
  var query = req.query;
  var params = req.params;
  request({
    uri: apiUrl + "/customer/show/" + params.id + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    res.status(200).send(result);
  });
});

router.get("/order/find", function(req, res) {
  var query;
  query = req.query;
  query['expand'] = query['expand'] + ',customer';
  return request({
    uri: apiUrl + "/order/findByOrderNumber" + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    res.status(200).send(result);
  });
});

router.use(requireAdmin);

module.exports = router;
