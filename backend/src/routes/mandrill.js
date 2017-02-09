var Slack, apiKey, apiUrl, client, config, express, loggly, mandrill, mandrillConfig, mandrill_client, request, requireLogin, router, slackConfig, slackMandrill;
express = require("express");
router = express.Router();
request = require("request");
config = require("../config/server/config.json");
mandrill = require('mandrill-api/mandrill');
apiUrl = config.apiUrl;
apiKey = config.apiKey;
mandrillConfig = config.mandrill;
requireLogin = require("./require-login");
loggly = require('loggly');
client = loggly.createClient(config.loggly);
mandrill_client = new mandrill.Mandrill(mandrillConfig.apiKey);
slackConfig = require("../config/slack.json");
Slack = require('node-slack');
slackMandrill = new Slack(slackConfig.channels.mandrill.webhook);

router.post("/sendTemplate", function(req, res) {
  var params;

  params = req.body;
  params.template_content = params.template_content || [];
  return mandrill_client.messages.sendTemplate(params, (function(result) {
    slackMandrill.send({
      text: 'Template Sent',
      channel: slackConfig.channels.mandrill.channel,
      username: slackConfig.usernames.frontend,
      icon_emoji: ':email:',
      attachments: [
        {
          title: params.message.subject + ' Sent',
          title_link: 'https://mandrillapp.com/templates/code?id=' + params.template_name,
          fields: [
            {
              "title": "Template Name",
              "value": params.template_name,
              "short": true
            }, {
              "title": "Subject",
              "value": params.message.subject,
              "short": true
            }, {
              "title": "Sent From",
              "value": params.message.from_name + ' <' + params.message.from_email + '>',
              "short": true
            }, {
              "title": "Sent To",
              "value": params.message.to[0].email,
              "short": true
            }
          ]
        }
      ]
    });
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
