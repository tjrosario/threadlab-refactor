var express, request, requireLogin, router;
express = require("express");
router = express.Router();
request = require("request");
requireLogin = require("./require-login");

module.exports = router;
