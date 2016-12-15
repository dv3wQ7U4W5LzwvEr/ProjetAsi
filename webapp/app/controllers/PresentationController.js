'use strict';

var CONFIG = JSON.parse(process.env.CONFIG);
var utils = require("../utils/utils.js");
var fs = require("fs");
var path = require("path");

exports.loadPres = function (req, res) {

    utils.listFiles(CONFIG.presentationDirectory, "json", function (err, files) {

        var result = {};

        if(err) {
            res.end("Erreur");
            return;
        }

        files.forEach(function (file) {
            var data = fs.readFileSync(CONFIG.presentationDirectory + path.sep + file, "utf-8");

            var dataJson = JSON.parse(data);
            
            result[dataJson.id] = dataJson;
        }, this);

        res.end(JSON.stringify(result));
    });
}

exports.savePres = function (req, res) {
    
    var contentType = req.headers['content-type'];

    if(!contentType || contentType.indexOf('application/json') !== 0) {
        res.end("Error: wrong content type");
        return;
    }

    if(!req.body) {
        res.end("Error: body can't be empty");
        return;
    }

    if(!req.body.id) {
        res.end("Error: id should be defined");
        return;
    }

    var filename = CONFIG.presentationDirectory + path.sep + req.body.id + ".pres.json";
    fs.writeFile(filename, JSON.stringify(req.body), function(err) {
        if(err) res.end("Error: presentation not saved");
        else res.end("Presentation saved");
    });
}