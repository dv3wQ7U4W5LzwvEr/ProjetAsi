"use strict";

var presentationController = require("../controllers/PresentationController.js");
var express = require("express");
var router = express.Router();
module.exports = router;

router.route("/loadPres")
    .get(presentationController.loadPres);

router.route("/savePres")
    .post(presentationController.savePres);