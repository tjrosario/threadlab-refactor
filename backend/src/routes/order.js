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
  return apiUrl + "/order" + url + "&" + apiKey;
};

router.get("/create", requireLogin, function(req, res) {
  var query;
  query = req.query;
  query['customer.id'] = req.session.userID;
  return request({
    uri: apiUrl + "/order/create/" + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    result.query = query;
    result.params = req.params;
    client.log(result, ['order', 'create']);
    return res.status(200).send(result);
  });
});

router.get("/rejectItem/:id", requireLogin, function(req, res) {
  var query;
  query = req.query;
  return request({
    uri: apiUrl + '/order/rejectItem/' + req.params.id + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    result.query = query;
    result.params = req.params;
    client.log(result, ['order', 'rejectItem']);
    return res.status(200).send(result);
  });
});

router.get("/undoRejectItem/:id", requireLogin, function(req, res) {
  var query;
  query = req.query;
  return request({
    uri: apiUrl + '/order/undoRejectItem/' + req.params.id + "?" + apiKey,
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    result.query = query;
    result.params = req.params;
    client.log(result, ['order', 'undoRejectItem']);
    return res.status(200).send(result);
  });
});

router.get("/returnItem/:id", requireLogin, function(req, res) {
  var query;
  query = req.query;
  return request({
    uri: apiUrl + '/order/returnItem/' + req.params.id + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    result.query = query;
    result.params = req.params;
    client.log(result, ['order', 'returnItem']);
    return res.status(200).send(result);
  });
});

router.get("/undoReturnItem/:id", requireLogin, function(req, res) {
  var query;
  query = req.query;
  return request({
    uri: apiUrl + '/order/undoReturnItem/' + req.params.id + "?" + apiKey,
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    result.query = query;
    result.params = req.params;
    client.log(result, ['order', 'undoReturnItem']);
    return res.status(200).send(result);
  });
});

router.get("/update/:id", requireLogin, function(req, res) {
  var query;
  query = req.query;
  return request({
    uri: apiUrl + "/order/update/" + req.params.id + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    result.query = query;
    result.params = req.params;
    return res.status(200).send(result);
  });
});

router.get("/finalize/:id", requireLogin, function(req, res) {
  var query;
  query = req.query;
  return request({
    uri: apiUrl + "/order/finalize/" + req.params.id + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    result.query = query;
    result.params = req.params;
    client.log(result, ['order', 'finalize']);
    return res.status(200).send(result);
  });
});

router.get("/confirm", requireLogin, function(req, res) {
  var params, query, result;
  query = req.query;
  params = req.params;
  result = {};
  result.query = query;
  result.params = params;
  client.log(result, ['order', 'confirm']);
  return res.status(200).send(result);
});

router.get("/checkout/:id", requireLogin, function(req, res) {
  var query;
  query = req.query;
  return request({
    uri: apiUrl + "/order/checkout/" + req.params.id + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    result.query = query;
    result.params = req.params;
    client.log(result, ['order', 'checkout']);
    return res.status(200).send(result);
  });
});

router.get("/accept/:id", requireLogin, function(req, res) {
  var query;
  query = req.query;
  return request({
    uri: apiUrl + "/order/accept/" + req.params.id + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    result.query = query;
    result.params = req.params;
    client.log(result, ['order', 'accept']);
    return res.status(200).send(result);
  });
});

router.get("/reject/:id", requireLogin, function(req, res) {
  var query;
  query = req.query;
  return request({
    uri: apiUrl + "/order/reject/" + req.params.id + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    result.query = query;
    result.params = req.params;
    client.log(result, ['order', 'reject']);
    return res.status(200).send(result);
  });
});

router.get("/match/:id", requireLogin, function(req, res) {
  var query;
  query = req.query;
  return request({
    uri: apiUrl + "/order/match/" + req.params.id + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    result.query = query;
    result.params = req.params;
    client.log(result, ['order', 'match']);
    return res.status(200).send(result);
  });
});

router.get("/cancel/:id", requireLogin, function(req, res) {
  var query;
  query = req.query;
  return request({
    uri: apiUrl + "/order/cancel/" + req.params.id + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    result.query = query;
    result.params = req.params;
    client.log(result, ['order', 'cancel']);
    return res.status(200).send(result);
  });
});

router.get("/findByOrderNumber", requireLogin, function(req, res) {
  var query;
  query = req.query;
  query['expand'] = query['expand'] + ',customer';

  if (isNaN(parseInt(query.orderNumber))) {
    res.json({
      success: false
    });
  } else {
    return request({
      uri: apiUrl + "/order/findByOrderNumber" + "?" + apiKey + "&" + querystring.stringify(query),
      method: "GET"
    }, function(err, resp, body) {
      var customer, result;
      result = JSON.parse(body);
      if (result.success) {
        customer = result.data.customer;
        if (customer.id === req.session.userID) {
          res.status(200).send(result);
        } else {
          res.json({
            success: false
          });
        }
      } else {
        res.status(200).send(result);
      }
      result.query = query;
      result.params = req.params;
      return client.log(result, ['order', 'findByOrderNumber']);
    });  
  }
});

router.get("/findByOrderNumberAlt", requireLogin, function(req, res) {
  var query;
  query = req.query;
  query['expand'] = query['expand'] + ',customer';
  return request({
    uri: apiUrl + "/order/findByOrderNumber" + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);

    /*
    if result.success
      customer = result.data.customer
    
      if customer.id is req.session.userID
        res.status(200).send(result)
      else
        res.json
          success: false
    else
      res.status(200).send(result)
     */
    res.status(200).send(result);
    result.query = query;
    result.params = req.params;
    return client.log(result, ['order', 'findByOrderNumber']);
  });
});

router.get("/find", requireLogin, function(req, res) {
  var query;
  query = req.query;
  query['expand'] = query['expand'] + ',customer';
  return request({
    uri: apiUrl + "/order/find" + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var customer, result;
    result = JSON.parse(body);
    if (result.success) {
      customer = result.data.customer;
      if (customer.id === req.session.userID) {
        res.status(200).send(result);
      } else {
        res.json({
          success: false
        });
      }
    } else {
      res.status(200).send(result);
    }
    result.query = query;
    result.params = req.params;
    return client.log(result, ['order', 'find']);
  });
});

router.get("/findAlt", function(req, res) {
  var query;
  query = req.query;
  query['expand'] = query['expand'] + ',customer';
  return request({
    uri: apiUrl + "/order/find" + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var order, result;
    result = JSON.parse(body);
    result.query = query;
    result.params = req.params;
    client.log(result, ['order', 'findAlt']);
    if (req.session.userID) {
      order = result.data;
      return request({
        uri: apiUrl + "/order/update/" + order.id + "?" + apiKey + "&customer.id=" + req.session.userID,
        method: "GET"
      }, function(err, resp, body) {
        var updatedResult;
        updatedResult = JSON.parse(body);
        updatedResult.data.productNeeds = order.productNeeds;
        updatedResult.data.orderItems = order.orderItems;
        return res.status(200).send(updatedResult);
      });
    } else {
      return res.status(200).send(result);
    }
  });
});

router.get("/applyPromo/:id", requireLogin, function(req, res) {
  var query;
  query = req.query;
  return request({
    uri: apiUrl + "/order/applyPromo/" + req.params.id + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    result.query = query;
    result.params = req.params;
    client.log(result, ['order', 'applyPromo']);
    return res.status(200).send(result);
  });
});

module.exports = router;
