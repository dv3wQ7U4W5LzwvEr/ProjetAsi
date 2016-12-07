"use strict";

var utils = require("../utils/utils.js");
var fs = require("fs");
var CONFIG = JSON.parse(process.env.CONFIG);
var express = require("express");
var router = express.Router();
module.exports = router;

router.route("/loadPres")
    .get(loadPres);

router.route("/savePres")
    .get(function (req, res) {
        res.end("Hello world");
    });

function loadPres(req, res) {
    utils.listFiles(CONFIG.presentationDirectory, "json", function (err, files) {
        var result = {};
        
        if(err) {
            res.end("Error");
            return;
        }

        files.forEach(function (file) {
            var data = fs.readFileSync(CONFIG.presentationDirectory+"\\"+file, "utf-8");
            var dataJson = JSON.parse(data);
            
            result[dataJson.id] = dataJson;
        }, this);

        res.end(JSON.stringify(result));
    });
}