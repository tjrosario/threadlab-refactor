var Slack, Spreadsheet, apiKey, apiUrl, client, config, express, googleConfig, loggly, mailConfig, nodemailer, request, router, slackConfig, slackFitKit, transporter;
express = require("express");
router = express.Router();
request = require("request");
nodemailer = require('nodemailer');
config = require("../config/server/config.json");
slackConfig = require("../config/slack.json");
apiUrl = config.apiUrl;
apiKey = config.apiKey;
mailConfig = config.smtp;
googleConfig = config.google;
transporter = nodemailer.createTransport(mailConfig);
loggly = require('loggly');
client = loggly.createClient(config.loggly);
Spreadsheet = require('edit-google-spreadsheet');
Slack = require('node-slack');
slackFitKit = new Slack(slackConfig.channels.fitkit.webhook);

router.post("/contact", function(req, res) {
  var data;
  data = req.body.data;
  return transporter.sendMail(data, function(resp) {
    client.log(resp, ['mail', 'ops']);
    return res.json({
      success: true,
      data: {
        message: 'Thank you for your message.  Someone from our team will be in touch shortly.'
      }
    });
  });
});

router.post("/ops", function(req, res) {
  var data;
  data = req.body.data;
  return transporter.sendMail(data, function(resp) {
    client.log(resp, ['mail', 'ops']);
    return res.json({
      success: true,
      data: {
        message: 'E-mail sent to operations teams.'
      }
    });
  });
});

router.post("/feedback", function(req, res) {
  var data;
  data = req.body.data;
  return transporter.sendMail(data, function(resp) {
    client.log(resp, ['mail', 'feedback']);
    return res.json({
      success: true,
      data: {
        message: 'Thank you for your feedback.  We appreciate it!'
      }
    });
  });
});

router.post("/cancelOrder", function(req, res) {
  var data;
  data = req.body.data;
  return transporter.sendMail(data, function(resp) {
    client.log(resp, ['mail', 'cancelOrder']);
    return res.json({
      success: true,
      data: {
        message: "We're sorry to hear you cancelled your order."
      }
    });
  });
});

router.post("/orderNoMatches", function(req, res) {
  var data;
  data = req.body.data;
  return transporter.sendMail(data, function(resp) {
    client.log(resp, ['mail', 'orderNoMatches']);
    return res.json({
      success: true,
      data: {
        message: "E-mail sent for order with no matches."
      }
    });
  });
});

router.post("/orderCategoryNoMatches", function(req, res) {
  var data;
  data = req.body.data;
  return transporter.sendMail(data, function(resp) {
    client.log(resp, ['mail', 'orderCategoryNoMatches']);
    return res.json({
      success: true,
      data: {
        message: "E-mail sent for category with no matches."
      }
    });
  });
});

router.post("/fitKit", function(req, res) {
  var address, data;
  data = req.body.data;
  address = data.address;
  slackFitKit.send({
    text: 'Request Submitted',
    channel: slackConfig.channels.fitkit.channel,
    username: slackConfig.usernames.frontend,
    icon_emoji: ':metal:',
    attachments: [
      {
        "fields": [
          {
            "title": "Name",
            "value": address.addresseeFirstName + ' ' + address.addresseeLastName,
            "short": true
          }, {
            "title": "Email",
            "value": address.email,
            "short": true
          }, {
            "title": "Address Line 1",
            "value": address.addressLine1,
            "short": true
          }, {
            "title": "Address Line 2",
            "value": address.addressLine2,
            "short": true
          }, {
            "title": "City",
            "value": address.city,
            "short": true
          }, {
            "title": "State",
            "value": address.state,
            "short": true
          }, {
            "title": "Zip",
            "value": address.zip,
            "short": true
          }, {
            "title": "Phone",
            "value": address.addresseePhone,
            "short": true
          }, {
            "title": "Date Submitted",
            "value": address.dateSubmitted,
            "short": true
          }
        ]
      }
    ]
  });
  Spreadsheet.load({
    debug: true,
    spreadsheetId: googleConfig.sheets.fitKit.spreadsheetId,
    worksheetId: googleConfig.sheets.fitKit.worksheetId,
    oauth2: googleConfig.oauth2
  }, function(err, spreadsheet) {
    return spreadsheet.receive(function(err, rows, info) {
      var nextRow;
      nextRow = info.nextRow;
      data = {};
      data[nextRow] = [[address.addresseeLastName, address.addresseeFirstName, address.addressLine1, address.addressLine2, address.city, address.state, "'" + address.zip, address['customer.id'], address.dateSubmitted, address.email, address.addresseePhone]];
      spreadsheet.add(data);
      return spreadsheet.send({
        autoSize: true
      });
    });
  });
  return transporter.sendMail(data, function(resp) {
    client.log(resp, ['mail', 'fitKit']);
    return res.json({
      success: true,
      data: {
        message: 'YourFitKit request has been submitted.  Thank you.'
      }
    });
  });
});

module.exports = router;
