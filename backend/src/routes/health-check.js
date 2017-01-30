var apiKey, apiUrl, config, express, request, router;
express = require("express");
router = express.Router();
request = require("request");
config = require("../config/server/config.json");
apiUrl = config.apiUrl;
apiKey = config.apiKey;

router.get("/get", function(req, res) {
  return request({
    uri: apiUrl + "/product/ping/" + "?" + apiKey,
    method: "GET"
  }, function(err, resp, body) {
    var result;
    result = body;
    if (body.length) {
      return res.status(200).send(result);
    } else {
      return res.status(500).send(result);
    }
  });
});

module.exports = router;
