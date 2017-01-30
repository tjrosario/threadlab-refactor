var addCustomerAddress, apiKey, apiUrl, client, config, createGiftCardOrder, express, ipn, loggly, mailConfig, nodemailer, onFail, onIPNSuccess, paypalConfig, paypalSDK, querystring, request, requireLogin, router, sendMail, settings, transporter, updateCustomerOrder, utils, acceptCustomerOrder;
express = require("express");
router = express.Router();
request = require("request");
config = require("../config/server/config.json");
querystring = require('querystring');
apiUrl = config.apiUrl;
apiKey = config.apiKey;
mailConfig = config.smtp;
requireLogin = require("./require-login");
nodemailer = require('nodemailer');
transporter = nodemailer.createTransport(mailConfig);
ipn = require('paypal-ipn');
paypalConfig = config.paypal;
paypalSDK = require('paypal-rest-sdk');
utils = require("./utils");

settings = {
  allow_sandbox: true
};

loggly = require('loggly');
client = loggly.createClient(config.loggly);

paypalSDK.configure({
  mode: paypalConfig.mode,
  client_id: paypalConfig.client_id,
  client_secret: paypalConfig.client_secret
});

onIPNSuccess = function(params) {
  var email, giftCardAmount, giftCardOrderParams, giftCardParams, subject;
  email = encodeURIComponent(params.custom);
  subject = 'PayPal Order (' + params.payment_status + ')';
  if (email && email !== '') {
    return request({
      uri: apiUrl + "/customer/find/" + "?" + apiKey + "&email=" + email,
      method: "GET"
    }, function(err, res, body) {
      var customerID, result;
      result = JSON.parse(body);
      if (result.success) {
        customerID = result.data.id;
        addCustomerAddress(customerID, params, {
          callback: function(data) {
            var giftCardAmount, giftCardOrderParams, giftCardParams, orderNumber, updateParams;
            params.memo = params.memo || '';
            updateParams = {
              specialInstructions: params.memo,
              paymentMethod: 'paypal',
              transactionId: params.txn_id
            };

            /*
            if data.id
              updateParams.shippingAddress = data.id
             */
            if (params['item_name'].indexOf('Order-') > -1) {
              // first payment (deposit)
              if (params['item_name'].indexOf('Authorization') > -1) {
                orderNumber = params['item_name'].replace('Order-', '').replace(' (Authorization)', '');
                updateParams.paymentAmount = '0';
                updateCustomerOrder(customerID, orderNumber, updateParams);
              } 
              // second payment
              else {
                updateParams.paymentAmount = params.mc_gross;
                orderNumber = params['item_name'].replace('Order-', '');
                acceptCustomerOrder(customerID, orderNumber, updateParams);
              }
            }
            if (params['item_name'].indexOf('Gift Card') > -1) {
              giftCardAmount = params['item_name'].replace('Gift Card Purchase - $', '');
              giftCardParams = {
                value: giftCardAmount
              };
              giftCardOrderParams = {
                transactionId: params.txn_id,
                paymentMethod: "paypal",
                paymentAmount: giftCardAmount,
                customerId: customerID,
                email: email
              };
              createGiftCardOrder(giftCardParams, giftCardOrderParams);
            }
            return sendMail(params, {
              subject: subject
            });
          }
        });
      } else {
        sendMail(params, {
          subject: subject + ' (Customer Not Found)'
        });
      }
      return client.log(result, ['paypal', 'ipn']);
    });
  } else {
    if (params['item_name'].indexOf('Gift Card') > -1) {
      giftCardAmount = params['item_name'].replace('Gift Card Purchase - $', '');
      giftCardParams = {
        value: giftCardAmount
      };
      giftCardOrderParams = {
        transactionId: params.txn_id,
        paymentMethod: "paypal",
        paymentAmount: giftCardAmount,
        email: params.payer_email
      };
      createGiftCardOrder(giftCardParams, giftCardOrderParams);
    }
    sendMail(params, {
      subject: subject
    });
    return client.log(result, ['paypal', 'ipn']);
  }
};

onFail = function(params) {
  var email;
  email = params.custom;
  return sendMail(params, {
    subject: 'PayPal Order Invalid'
  });
};

createGiftCardOrder = function(giftCardParams, giftCardOrderParams) {
  return request({
    uri: apiUrl + "/giftCard/create/" + "?" + apiKey + "&" + querystring.stringify(giftCardParams),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    if (result.success) {
      giftCardOrderParams.giftCardId = result.data.id;
      return request({
        uri: apiUrl + "/giftCardOrder/create/" + "?" + apiKey + "&" + querystring.stringify(giftCardOrderParams),
        method: "GET"
      }, function(err, resp, body) {
        result = JSON.parse(body);
        if (result.success) {
          return console.log("Gift Card Order Created");
        }
      });
    }
  });
};

updateCustomerOrder = function(customerID, orderNumber, params) {
  var expand;
  expand = 'orders/productNeeds/productCategory,orders/orderItems/item/product,orders/virtualOrderItems/product';
  return request({
    uri: apiUrl + "/customer/show/" + customerID + "?" + apiKey + "&expand=" + expand,
    method: "GET"
  }, function(err, resp, body) {
    var order, orderID, orderNum, orderObj, orders, result;
    result = JSON.parse(body);
    if (result.success) {
      orders = result.data.orders;
      orderNum = parseInt(orderNumber, 10);
      order = utils.objectFindByKey(orders, 'orderNumber', orderNum);
      if (order.length) {
        orderObj = order[0];
        orderID = orderObj.id;
        if (params.specialInstructions) {
          params.specialInstructions = orderObj.specialInstructions + '.  ' + params.specialInstructions;
        }
        params.isPreviewRequired = (orderObj.isPreviewRequired ? true : false);
        return request({
          uri: apiUrl + "/order/finalize/" + orderID + "?" + apiKey + "&" + querystring.stringify(params),
          method: "GET"
        }, function(err, resp, body) {
          return console.log("Order Updated");
        });
      }
    }
  });
};

acceptCustomerOrder = function(customerID, orderNumber, params) {
  var expand;
  expand = 'orders/productNeeds/productCategory,orders/orderItems/item/product,orders/virtualOrderItems/product';
  return request({
    uri: apiUrl + "/customer/show/" + customerID + "?" + apiKey + "&expand=" + expand,
    method: "GET"
  }, function(err, resp, body) {
    var order, orderID, orderNum, orderObj, orders, result;
    result = JSON.parse(body);
    if (result.success) {
      orders = result.data.orders;
      orderNum = parseInt(orderNumber, 10);
      order = utils.objectFindByKey(orders, 'orderNumber', orderNum);
      if (order.length) {
        orderObj = order[0];
        orderID = orderObj.id;
        
        return request({
          uri: apiUrl + "/order/accept/" + orderID + "?" + apiKey + "&" + querystring.stringify(params),
          method: "GET"
        }, function(err, resp, body) {
          return console.log("Order Accepted");
        });
      }
    }
  });
};

addCustomerAddress = function(customerID, params, opts) {
  var address;
  opts = opts || {};
  opts.callback = opts.callback || function() {};
  address = {
    addresseeFirstName: params.first_name,
    addresseeLastName: params.last_name,
    addressLine1: params.address_street,
    city: params.address_city,
    state: params.address_state,
    zip: params.address_zip,
    addresseeEmail: params.custom,
    addresseePhone: params.contact_phone,
    type: 'shipping',
    'customer.id': customerID
  };
  return request({
    uri: apiUrl + "/address/create" + "?" + apiKey + "&" + querystring.stringify(address),
    method: "GET"
  }, function(err, res, body) {
    var result;
    result = JSON.parse(body);
    if (result.success) {
      opts.callback(result.data);
      console.log("Address Created");
    } else {
      opts.callback(false);
    }
    return client.log(result, ['paypal', 'address', 'create']);
  });
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
    from: paypalConfig.email.from,
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

router.post("/ipn", function(req, res) {
  var params;
  params = req.body;
  return ipn.verify(params, settings, function(err, msg) {
    if (err) {
      onFail(params);
      return res.status(200).send("Invalid IPN");
    } else {
      onIPNSuccess(params);
      return res.status(200).send(params.payment_status);
    }
  });
});

module.exports = router;
