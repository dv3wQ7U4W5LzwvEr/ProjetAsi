"use strict";

var CONFIG = JSON.parse(process.env.CONFIG);

var express = require("express");
var router = express.Router();

router.route("/")
    .get(function (req, res) {
        res.redirect(CONFIG.defaultPage);
    });

module.exports = router;