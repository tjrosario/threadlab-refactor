var MailChimpAPI, apiKey, apiUrl, client, config, error, express, loggly, mailChimpAPI, mailchimp, request, requireLogin, router;
express = require("express");
router = express.Router();
request = require("request");
MailChimpAPI = require("mailchimp").MailChimpAPI;
config = require("../config/server/config.json");
apiUrl = config.apiUrl;
apiKey = config.apiKey;
mailchimp = config.mailchimp;
requireLogin = require("./require-login");
loggly = require('loggly');
client = loggly.createClient(config.loggly);

try {
  mailChimpAPI = new MailChimpAPI(mailchimp.apiKey, {
    version: "2.0"
  });
} catch (_error) {
  error = _error;
  console.log(error.message);
}

router.get("/:section/:method*", function(req, res) {
  var method, params, section;
  section = req.params.section;
  method = req.params.method;
  params = req.query;
  return mailChimpAPI.call(section, method, params, function(error, data) {
    if (error) {
      res.json({
        success: false,
        error: error.message
      });
    } else {
      res.json({
        success: true,
        data: data
      });
    }
    client.log(data, ['mailchimp', section, method]);
  });
});

router.post("/:section/:method*", function(req, res) {
  var method, params, section;
  section = req.params.section;
  method = req.params.method;
  params = req.body.data;
  return mailChimpAPI.call(section, method, params, function(error, data) {
    if (error) {
      res.json({
        success: false,
        error: error.message
      });
    } else {
      res.json({
        success: true,
        data: data
      });
    }
    client.log(data, ['mailchimp', section, method]);
  });
});

module.exports = router;
