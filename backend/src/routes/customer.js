var apiKey, apiUrl, bcrypt, client, config, express, getAPIUrl, getStripeAPIUrl, loggly, mailConfig, mandrill, mandrillConfig, mandrill_client, nodemailer, paypalConfig, paypalSDK, querystring, request, requireLogin, router, sendMail, stripe, stripeHeaders, transporter;

express = require("express");
router = express.Router();
request = require("request");
bcrypt = require('bcryptjs');
querystring = require('querystring');
config = require("../config/server/config.json");
apiUrl = config.apiUrl;
apiKey = config.apiKey;
stripe = config.stripe;
stripeHeaders = config.stripeHeaders;
mailConfig = config.smtp;
requireLogin = require("./require-login");
nodemailer = require('nodemailer');
transporter = nodemailer.createTransport(mailConfig);
paypalSDK = require('paypal-rest-sdk');
paypalConfig = config.paypal;
loggly = require('loggly');
client = loggly.createClient(config.loggly);
mandrill = require('mandrill-api/mandrill');
mandrillConfig = config.mandrill;
mandrill_client = new mandrill.Mandrill(mandrillConfig.apiKey);

getAPIUrl = function(url) {
  return apiUrl + "/customer" + url + "&" + apiKey;
};

getStripeAPIUrl = function(url) {
  return stripe.apiUrl + url;
};

sendMail = function(params, options) {
  var data, html, key;
  html = '';
  for (key in params) {
    if (params.hasOwnProperty(key)) {
      html = html + '<strong>' + key + '</strong>: ' + params[key] + '<br>';
    }
  }
  data = {
    from: config.email.alerts,
    to: config.email.service,
    subject: options.subject,
    html: html
  };
  return transporter.sendMail(data, function(error, info) {
    if (error) {
      return console.log("Mail could not be sent: " + error);
    } else {
      return console.log("Mail sent successfully");
    }
  });
};

router.get("/createPlaceholder", function(req, res) {
  var query;
  query = req.query;
  return request({
    uri: apiUrl + "/customer/createPlaceholder" + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    result.query = query;
    result.params = req.params;
    client.log(result, ['customer', 'createPlaceholder']);
    return res.status(200).send(result);
  });
});

router.get("/getLogin", function(req, res) {
  var params, query, usernane;
  query = req.query;
  params = req.params;
  username = encodeURIComponent(req.query.username);
  return request({
    uri: apiUrl + "/customer/getLogin?" + apiKey + "&email=" + username,
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    result.query = query;
    result.params = req.params;
    client.log(result, ['customer', 'getLogin']);
    return res.status(200).send(result);
  });
});

router.get("/resetPassword/:id", function(req, res) {
  var params, query;
  query = req.query;
  params = req.params;
  return request({
    uri: apiUrl + "/customer/resetPassword/" + params.id + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    result.query = query;
    result.params = req.params;
    client.log(result, ['customer', 'resetPassword']);
    return res.status(200).send(result);
  });
});

router.get("/updatePassword", function(req, res) {
  var hash, obj, query, salt;
  query = req.query;
  obj = {
    password: query.password
  };
  if (obj.password != null) {
    salt = bcrypt.genSaltSync(10);
    hash = bcrypt.hashSync(obj.password, salt);
    obj.password = hash;
  }
  return request({
    uri: apiUrl + "/customer/update/" + query.id + "?" + apiKey + "&" + querystring.stringify(obj),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    result.query = query;
    result.params = req.params;
    client.log(result, ['customer', 'update']);
    return res.status(200).send(result);
  });
});

router.get("/find", function(req, res) {
  var query;
  query = req.query;
  return request({
    uri: apiUrl + "/customer/find/" + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    result.query = query;
    result.params = req.params;
    client.log(result, ['customer', 'find']);
    return res.status(200).send(result);
  });
});

router.get("/getMatchingProducts", requireLogin, function(req, res) {
  var query;
  query = req.query;
  return request({
    uri: apiUrl + "/customer/getMatchingProducts/" + req.session.userID + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    result.query = query;
    result.params = req.params;
    client.log(result, ['customer', 'getMatchingProducts']);
    return res.status(200).send(result);
  });
});

router.get("/rejectProduct", requireLogin, function(req, res) {
  var query;
  query = req.query;
  return request({
    uri: apiUrl + "/customer/rejectProduct/" + req.session.userID + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    result.query = query;
    result.params = req.params;
    client.log(result, ['customer', 'rejectProduct']);
    return res.status(200).send(result);
  });
});

router.get("/createOrder", requireLogin, function(req, res) {
  var query;
  query = req.query;
  return request({
    uri: apiUrl + "/customer/createOrder/" + req.session.userID + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    result.query = query;
    result.params = req.params;
    client.log(result, ['customer', 'createOrder']);
    return res.status(200).send(result);
  });
});

router.get("/createOrderFromProductNeeds", function(req, res) {
  var i, productCategories, query, queryStr, userID;
  query = req.query;
  userID = query['customer.id'];
  productCategories = query.productCategories.split(',');
  delete query['productCategories'];
  delete query['customer.id'];
  queryStr = querystring.stringify(query);
  i = 0;
  while (i < productCategories.length) {
    queryStr += '&productCategory=' + productCategories[i];
    i++;
  }
  return request({
    uri: apiUrl + "/customer/createOrderFromProductNeeds/" + userID + "?" + apiKey + "&" + queryStr,
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    result.query = query;
    result.params = req.params;
    client.log(result, ['customer', 'createOrderFromProductNeeds']);
    return res.status(200).send(result);
  });
});

router.get("/get", requireLogin, function(req, res) {
  var query;
  query = req.query;
  return request({
    uri: apiUrl + "/customer/show/" + req.session.userID + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    result.query = query;
    result.params = req.params;
    client.log(result, ['customer', 'show']);
    return res.status(200).send(result);
  });
});

router.get("/fetch", function(req, res) {
  var query;
  query = req.query;
  return request({
    uri: apiUrl + "/customer/show/" + query['customer.id'] + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    result.query = query;
    result.params = req.params;
    client.log(result, ['customer', 'show', 'fetch']);
    return res.json({
      success: true,
      data: {
        email: result.data.email
      }
    });
  });
});

router.get("/redeemGiftCard", requireLogin, function(req, res) {
  var query;
  query = req.query;
  return request({
    uri: apiUrl + "/customer/redeemGiftCard/" + req.session.userID + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    result.query = query;
    result.params = req.params;
    client.log(result, ['customer', 'redeemGiftCard']);
    return res.status(200).send(result);
  });
});

router.get("/update", requireLogin, function(req, res) {
  var hash, query, salt;
  query = req.query;
  if (query.password != null) {
    salt = bcrypt.genSaltSync(10);
    hash = bcrypt.hashSync(req.query.password, salt);
    query.password = hash;
  }
  return request({
    uri: apiUrl + "/customer/update/" + req.session.userID + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    result.query = query;
    result.params = req.params;
    client.log(result, ['customer', 'update']);
    return res.status(200).send(result);
  });
});

router.get("/updateAlt", function(req, res) {
  var hash, query, salt, userID;
  query = req.query;
  userID = query['customer.id'];
  delete query['customer.id'];
  if (query.password != null) {
    salt = bcrypt.genSaltSync(10);
    hash = bcrypt.hashSync(req.query.password, salt);
    query.password = hash;
  }
  return request({
    uri: apiUrl + "/customer/update/" + userID + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    result.query = query;
    result.params = req.params;
    client.log(result, ['customer', 'updateAlt']);
    return res.status(200).send(result);
  });
});

router.get("/updateSignup", function(req, res) {
  var hash, query, salt;
  query = req.query;
  if (query.password != null) {
    salt = bcrypt.genSaltSync(10);
    hash = bcrypt.hashSync(req.query.password, salt);
    query.password = hash;
  }
  return request({
    uri: apiUrl + "/customer/update/" + query.id + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    result.query = query;
    result.params = req.params;
    client.log(result, ['customer', 'update', 'updateSignup']);
    return res.status(200).send(result);
  });
});

router.get("/create", function(req, res) {
  var hash, query, salt;
  query = req.query;
  if (query.password != null) {
    salt = bcrypt.genSaltSync(10);
    hash = bcrypt.hashSync(req.query.password, salt);
    query.password = hash;
  }
  return request({
    uri: apiUrl + "/customer/create/" + "?" + apiKey + "&" + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    result.query = query;
    result.params = req.params;
    req.session.isNewCustomer = true;
    client.log(result, ['customer', 'create']);
    return res.status(200).send(result);
  });
});

router.post("/refund", function(req, res) {
  var charge, customer, order, params, paymentMethod, refund_details, result, subject, validPayments = [], orderPayment;
  params = {};
  customer = req.body.customer;
  order = req.body.order;

  // filter valid payment methods (stripe, paypal)
  for (var i = 0; i < order.payments.length; i++) {
    var payment = order.payments[i];
    var validPayment = payment.paymentMethod === 'stripe' || payment.paymentMethod === 'paypal';
    if (validPayment) {
      validPayments.push(payment);
    }
  }

  // sort by highest payment amount
  validPayments.sort(function (a, b) {
    return b.paymentAmount > a.paymentAmount;
  });

  orderPayment = validPayments[0];
  charge = orderPayment.transactionId;
  paymentMethod = orderPayment.paymentMethod;

  subject = config.email.refund.subject;
  
  if (paymentMethod === 'paypal') {
    refund_details = {
      amount: {
        currency: "USD",
        total: order.cashRefund
      }
    };
    return paypalSDK.capture.refund(charge, refund_details, function(error, refund) {
      var result;
      result = {};
      if (error) {
        result = error;
        res.json({
          success: false,
          message: error
        });
      } else {
        result = refund;
        res.json({
          success: true,
          data: refund
        });
      }
      result.firstName = customer.firstName;
      result.lastName = customer.lastName;
      result.email = customer.email;
      result.orderId = order.id;
      result.orderNumber = order.orderNumber;
      result.paymentMethod = paymentMethod;
      result.transactionId2 = charge;
      client.log(result, ['customer', 'refund', 'paypal']);
      return sendMail(result, {
        subject: subject
      });
    });
  } else if (paymentMethod === 'stripe') {
    params.amount = parseInt(Math.round(order.cashRefund * 100));
    return request({
      uri: stripe.apiUrl + '/charges/' + charge + '/refunds',
      method: "POST",
      headers: stripeHeaders,
      form: params
    }, function(err, resp, body) {
      var result;
      result = JSON.parse(body);
      result.firstName = customer.firstName;
      result.lastName = customer.lastName;
      result.email = customer.email;
      result.orderId = order.id;
      result.orderNumber = order.orderNumber;
      result.paymentMethod = paymentMethod;
      result.transactionId2 = charge;
      if (result.error) {
        result.error = result.error.message;
        subject = subject + ' (Error)';
        res.json({
          success: false,
          data: result,
          message: result.error
        });
      } else {
        res.json({
          success: true,
          data: result
        });
      }
      client.log(result, ['customer', 'refund', 'stripe']);
      return sendMail(result, {
        subject: subject
      });
    });
  } else {
    result = {};
    result.firstName = customer.firstName;
    result.lastName = customer.lastName;
    result.email = customer.email;
    result.orderId = order.id;
    result.orderNumber = order.orderNumber;
    result.paymentMethod = paymentMethod;
    result.transactionId2 = charge;
    subject = subject + ' (Error)';
    client.log(result, ['customer', 'refund']);
    res.json({
      success: false,
      data: result,
      message: 'An error has occurred.'
    });
    return sendMail(result, {
      subject: subject
    });
  }
});

router.post("/receipt", function(req, res) {
  var body, mandrillParams;
  body = req.body;
  mandrillParams = {
    template_name: 'order-receipt',
    template_content: [],
    message: {
      subject: 'Receipt for Order # ' + body.orderNumber,
      from_email: 'service@mythreadlab.com',
      from_name: 'ThreadLab',
      to: [
        {
          email: config.referralCandy.invoices.email,
          type: 'to'
        }
      ],
      merge_vars: [
        {
          rcpt: config.referralCandy.invoices.email,
          vars: [
            {
              name: 'FE_RECEIPT_FNAME',
              content: body.firstName
            }, {
              name: 'FE_RECEIPT_LNAME',
              content: body.lastName
            }, {
              name: 'FE_RECEIPT_EMAIL',
              content: body.email
            }, {
              name: 'FE_RECEIPT_ORDERNUM',
              content: body.orderNumber
            }, {
              name: 'FE_RECEIPT_INVOICE',
              content: body.invoiceValue
            }, {
              name: 'FE_RECEIPT_TIMESTAMP',
              content: body.timestamp
            }
          ]
        }
      ]
    }
  };
  return mandrill_client.messages.sendTemplate(mandrillParams, (function(result) {
    res.json({
      success: true,
      data: result
    });
  }), function(e) {
    res.json({
      success: false,
      error: e.message
    });
  });
});

module.exports = router;

