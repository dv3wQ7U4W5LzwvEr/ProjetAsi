"use strict";

var express = require("express");
var router = express.Router();
module.exports = router;

router.route("/")
    .get(function(req, res) {
        res.end("Hello world");
    });