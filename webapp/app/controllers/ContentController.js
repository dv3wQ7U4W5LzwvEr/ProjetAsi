'use strict';

var CONFIG = JSON.parse(process.env.CONFIG);

var fs = require("fs");
var path = require("path");

var utils = require("../utils/utils.js");
var ContentModel = require("./../models/content.model.js");

// Retourne la liste des Contents
exports.list = function (req, res) {
    console.log("ContentController.listFiles");

    utils.listFiles(CONFIG.contentDirectory, "json", function (err, files) {

        var result = {};

        if (err) {
            res.end("Error listing json file from : " + CONFIG.contentDirectory);
            return;
        }

        files.forEach(function (file) {
            var data = fs.readFileSync(utils.getDataFilePath(file), "utf-8");
            var dataJson = JSON.parse(data);

            result[dataJson.id] = dataJson;
        });

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
// soit le SlidModel au format JSON si on passe en paramètre ?json=true'  
exports.getContent = function (req, res) {
    console.log("ContentController.getContent");

    if (req.query.json == "true") {
        ContentModel.read(req.params.contentId, function (error, content) {
            if (error) {
                res.end(error);
                return;
            }

            res.end(JSON.stringify(content));
        });
    }
    else {
        // Read metadata file
        ContentModel.read(req.params.contentId, function (error, content) {
            if (error) {
                res.end(error);
                return;
            }

            // Load image file
            fs.readFile(utils.getDataFilePath(content.fileName), function (err, content) {
                if (err) {
                    res.end("Error reading image file: " + err);
                    return;
                }

                res.end(content, 'binary');
            });
        });
    }
}