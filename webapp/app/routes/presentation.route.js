"use strict";

var presentationController = require("../controllers/PresentationController.js");

var express = require("express");
var router = express.Router();

router.route("/loadPres")
    .get(presentationController.loadPres);

router.route("/savePres")
    .post(presentationController.savePres);

module.exports = router;