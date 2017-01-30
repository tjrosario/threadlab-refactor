var apiKey, apiUrl, client, config, express, getStripeAPIUrl, loggly, onInvalidRequest, request, requireLogin, router, stripe, stripeHeaders;
express = require("express");
router = express.Router();
request = require("request");
config = require("../config/server/config.json");
apiUrl = config.apiUrl;
apiKey = config.apiKey;
stripe = config.stripe;
stripeHeaders = config.stripeHeaders;
requireLogin = require("./require-login");
loggly = require('loggly');
client = loggly.createClient(config.loggly);

getStripeAPIUrl = function(url) {
  return stripe.apiUrl + url;
};

onInvalidRequest = function(req, res) {
  return res.redirect("/");
};

router.post("/customers", function(req, res) {
  var body, valid;
  body = req.body;
  //valid = body.email && body.card;
  valid = body.card;
  if (valid) {
    return request({
      uri: getStripeAPIUrl(req.url),
      headers: stripeHeaders,
      form: req.body,
      method: "post"
    }, function(err, resp, body) {
      var result;
      result = JSON.parse(body);
      client.log(result, ['stripe', 'customers']);
      return res.status(200).send(result);
    });
  } else {
    return onInvalidRequest(req, res);
  }
});

router.get("/customers/:id", function(req, res) {
  return request({
    uri: getStripeAPIUrl(req.url),
    headers: stripeHeaders,
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    client.log(result, ['stripe', 'customer']);
    return res.status(200).send(result);
  });
});

router.post("/customers/:id", function(req, res) {
  return request({
    uri: getStripeAPIUrl(req.url),
    headers: stripeHeaders,
    form: req.body,
    method: "post"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    client.log(result, ['stripe', 'customer']);
    return res.status(200).send(result);
  });
});

router.get("/customers/:id/sources", function(req, res) {
  return request({
    uri: getStripeAPIUrl(req.url),
    headers: stripeHeaders,
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    client.log(result, ['stripe', 'customer', 'cards']);
    return res.status(200).send(result);
  });
});

router.post("/customers/:id/sources", function(req, res) {
  return request({
    uri: getStripeAPIUrl(req.url),
    headers: stripeHeaders,
    form: req.body,
    method: "post"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    client.log(result, ['stripe', 'customer', 'cards']);
    return res.status(200).send(result);
  });
});

router.get("/customers/:id/sources/:cardID", function(req, res) {
  return request({
    uri: getStripeAPIUrl(req.url),
    headers: stripeHeaders,
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    client.log(result, ['stripe', 'customer', 'card']);
    return res.status(200).send(result);
  });
});

router.post("/customers/:id/sources/:cardID", function(req, res) {
  return request({
    uri: getStripeAPIUrl(req.url),
    headers: stripeHeaders,
    form: req.body,
    method: "post"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    client.log(result, ['stripe', 'customer', 'card']);
    return res.status(200).send(result);
  });
});

router["delete"]("/customers/:id/sources/:cardID", function(req, res) {
  var body, valid;
  body = req.params;
  valid = body.id && body.cardID;
  if (valid) {
    return request({
      uri: getStripeAPIUrl(req.url),
      headers: stripeHeaders,
      method: "DELETE"
    }, function(err, resp, body) {
      var result;
      result = JSON.parse(body);
      client.log(result, ['stripe', 'customer', 'card']);
      return res.status(200).send(result);
    });
  } else {
    return onInvalidRequest(req, res);
  }
});

router.post("/tokens", function(req, res) {
  var body, valid;
  body = req.body;
  valid = body.card && body.card.name && body.card.number && body.card.exp_month && body.card.exp_year && body.card.cvc && body.card.address_zip;
  if (valid) {
    return request({
      uri: getStripeAPIUrl(req.url),
      headers: stripeHeaders,
      form: req.body,
      method: "post"
    }, function(err, resp, body) {
      var result;
      result = JSON.parse(body);
      client.log(result, ['stripe', 'tokens']);
      return res.status(200).send(result);
    });
  } else {
    return onInvalidRequest(req, res);
  }
});

router.post("/charges", function(req, res) {
  var body, valid;
  body = req.body;
  valid = body.amount && body.card;
  if (valid) {
    return request({
      uri: getStripeAPIUrl(req.url),
      headers: stripeHeaders,
      form: req.body,
      method: "post"
    }, function(err, resp, body) {
      var result;
      result = JSON.parse(body);
      client.log(result, ['stripe', 'charges']);
      return res.status(200).send(result);
    });
  } else {
    return onInvalidRequest(req, res);
  }
});

router.get("/charges/:chargeID/capture", function(req, res) {
  return request({
    uri: getStripeAPIUrl(req.url),
    headers: stripeHeaders,
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    client.log(result, ['stripe', 'charges', 'capture']);
    return res.status(200).send(result);
  });
});

router.post("/charges/:chargeID/capture", function(req, res) {
  return request({
    uri: getStripeAPIUrl(req.url),
    headers: stripeHeaders,
    form: req.body,
    method: "post"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    client.log(result, ['stripe', 'charges', 'capture']);
    return res.status(200).send(result);
  });
});

module.exports = router;
