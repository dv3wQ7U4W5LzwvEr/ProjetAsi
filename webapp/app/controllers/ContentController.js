'use strict';

var CONFIG = JSON.parse(process.env.CONFIG);
var utils = require("../utils/utils.js");
var fs = require("fs");
var path = require("path");
var ContentModel = require("./../models/content.model.js");

// Retourne la liste des Contents
exports.list = function (req, res) {
    console.log("ContentController.listFiles");

    utils.listFiles(CONFIG.contentDirectory, "json", function (err, files) {

        var result = {};

        if (err) {
            res.end("Erreur");
            return;
        }

        files.forEach(function (file) {
            var data = fs.readFileSync(CONFIG.contentDirectory + path.sep + file, "utf-8");
            var dataJson = JSON.parse(data);

            result[dataJson.id] = dataJson;
        }, this);

        res.end(JSON.stringify(result));
    });
}

// Créé la Content dont les informations sont dans la requête
// nécessite header file -> pictures
// nécessite header user -> x
exports.create = function (req, res) {
    console.log("ContentController.create");

    var toto;

    toto.id = utiles.generateUUID();
    toto.type = request.file.mimetype;
    toto.title = request.file.originalname;
    toto.fileName = request.file.path;
    
    ControlModel(toto);

    res.end();
}

// Retourne la Content avec l'ID correspondante
// soit la slide (le contenu du fichier de données)
// soit le SlidModel au format JSON si on passe en paramètre   
exports.getContent = function (req, res) {
    console.log("ContentController.getContent");

    var json = req.headers['json'];

    var contentModel = fs.readFileSync(CONFIG.contentDirectory + path.sep + req.params.contentId + ".meta.json", "utf-8");

    if (JSON.stringify(json) == "\"true\"") {
        console.log("json == true");
        ContentModel.read(req.params.contentId, function (error, content) {
            if (content)
                res.end(JSON.stringify(content));
        });
    } else if (JSON.stringify(json) == "\"false\"") {
        console.log("json == false");
        ContentModel.read(req.params.contentId, function (error, content) {
            if (content)
                var data = fs.readFileSync(CONFIG.contentDirectory + path.sep + content.fileName);
            res.end(data);
        });
    }
    else {
        res.end();
    }
}