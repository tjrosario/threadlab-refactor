var apiKey, apiUrl, bcrypt, client, config, express, facebook, loggly, login, querystring, request, router, userRoles;
express = require("express");
router = express.Router();
request = require("request");
bcrypt = require('bcryptjs');
config = require("../config/server/config.json");
querystring = require('querystring');
apiUrl = config.apiUrl;
apiKey = config.apiKey;
facebook = config.facebook;
loggly = require('loggly');
client = loggly.createClient(config.loggly);
userRoles = require('./user-roles');

login = function(req, res) {
  return function(err, resp, body) {
    var authenticated, customer, response;
    response = JSON.parse(body);
    customer = response.data;
    authenticated = false;
    if (response.success === true) {
      if ((req.body.password && customer.password) && (bcrypt.compareSync(req.body.password, customer.password))) {
        authenticated = true;
        client.log(response, ['auth', 'getLogin']);
      } else if (req.body.facebookId && customer.facebookId) {
        if (req.body.facebookId.toString === customer.facebookId.toString) {
          authenticated = true;
          client.log(response, ['auth', 'getLogin', 'facebook']);
        }
      }
      if (authenticated) {
        var role = userRoles.getRole(customer.email);
        req.session.role = role;
        customer.role = role;

        req.session.user = customer.email;
        req.session.userID = customer.id;
        return res.json({
          success: true,
          data: customer
        });
      } else {
        return res.json({
          success: false
        });
      }
    } else {
      return res.json({
        success: false
      });
    }
  };
};

router.get("/logout", function(req, res) {
  req.session.destroy();
  return res.json({
    success: true,
    data: null
  });
});

router.post("/login", function(req, res) {
  var username;
  username = encodeURIComponent(req.body.username);
  return request({
    uri: apiUrl + "/customer/getLogin?" + apiKey + "&email=" + username,
    method: "GET"
  }, login(req, res));
});

router.post("/loginCustomer", function(req, res) {
  var customerID, getCustomer;
  customerID = req.body['customer.id'];
  getCustomer = function() {
    return request({
      uri: apiUrl + "/customer/show/" + customerID + "?" + apiKey,
      method: "GET"
    }, function(err, resp, body) {
      var result, username;
      result = JSON.parse(body);
      username = encodeURIComponent(result.data.email);
      return request({
        uri: apiUrl + "/customer/getLogin?" + apiKey + "&email=" + username,
        method: "GET"
      }, function(err, resp, body) {
        var customer, response;
        response = JSON.parse(body);
        customer = response.data;
        client.log(response, ['auth', 'getLogin', 'getLoginNoAuth']);
        if (response.success === true) {
          if (customer.id === customerID) {
            req.session.user = customer.email;
            req.session.userID = customer.id;
            return res.json({
              success: true,
              data: customer
            });
          } else {
            return res.json({
              success: false
            });
          }
        } else {
          return res.json({
            success: false
          });
        }
      });
    });
  };
  if (req.session.userID) {
    if (req.session.userID !== customerID) {
      return res.json({
        success: false
      });
    } else {
      return getCustomer();
    }
  } else {
    return getCustomer();
  }
});

router.post("/fblogin", function(req, res) {
  return request({
    uri: apiUrl + "/customer/find?" + apiKey + "&facebookId=" + req.body.facebookId,
    method: "GET"
  }, login(req, res));
});

router.get("/getFBGraphUser", function(req, res) {
  var query;
  query = req.query;
  query.client_secret = facebook.clientSecret;
  return request({
    uri: 'https://graph.facebook.com/v2.3/oauth/access_token?' + querystring.stringify(query),
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = JSON.parse(body);
    client.log(result, ['auth', 'getFBGraphUser']);
    if (result.access_token) {
      return res.json({
        success: true,
        data: result
      });
    } else if (result.error) {
      return res.json({
        success: false,
        message: result.error.message
      });
    }
  });
});

router.get("/current", function(req, res) {
  var user;
  user = encodeURIComponent(req.session.user);
  if (req.session.user) {
    return request({
      uri: apiUrl + ("/customer/getLogin?email=" + user + "&" + apiKey),
      method: "GET"
    }, function(err, resp, body) {
      var result;
      result = JSON.parse(body);

      client.log(result, ['auth', 'getLogin']);

      if (result.success) {
        result.data.role = req.session.role || 'user';
        if (req.session.isNewCustomer) {
          result.data.isNewCustomer = true;
        }
        return res.json(result);
      } else {
        res.json({
          success: false
        });
        return req.session = null;
      }
    });
  } else {
    res.json({
      success: false
    });
    return req.session = null;
  }
});

module.exports = router;
