"use strict";

var CONFIG = JSON.parse(process.env.CONFIG);
var fs = require("fs");
var path = require("path");

function SlidModel(slidModel) {

    // attributs publiques
    this.type = slidModel.type;
    this.id = slidModel.id;
    this.title = slidModel.title;
    this.fileName = slidModel.fileName;

    // attributs privés
    var data;

    // méthodes publiques
    this.getData = function(){
        return data;
    }

    this.setData = function (data) {
        this.data = data;
    }
}

// méthodes static
SlidModel.create = function (slid, callback) {

        var slidData = slid.getData();
        fs.writeFile(slid.fileName, slidData);

        var metadataPath = CONFIG.contentDirectory + path.sep + slid.id + ".meta.json";
        fs.writeFile(metadataPath, JSON.stringify(slid));
    }

SlidModel.read = function (id, callback) {

        var metadataPath = CONFIG.contentDirectory + path.sep + id + ".meta.json";
        console.log("toto" + metadataPath);
        fs.readFile(metadataPath, (err, data) => {
            if (err) {
                callback("Error reading metadata for id: " + id);
            }

            callback(null, new SlidModel(JSON.parse(data)));
        });
    }

SlidModel.update = function (slid, callback) {

        var slidData = slid.getData();
        var metadataPath = CONFIG.contentDirectory + path.sep + slid.id + ".meta.json";

        if(!slidData || slidData.length <= 0) {
            callback("Error updating metadata for id: " + slid.id);
        }

        fs.writeFile(slid.fileName, slidData);
        fs.writeFile(metadataPath, JSON.stringify(slid));
    }

SlidModel.deletePres = function (id, callback) {
        fs.unlink(CONFIG.presentationDirectory + path.sep + id + ".pres.json");
        fs.unlink(CONFIG.contentDirectory + path.sep + slid.id + ".meta.json");
    }

module.exports = SlidModel; // déclaration de la classe