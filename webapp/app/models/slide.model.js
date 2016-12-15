"use strict";

var CONFIG = JSON.parse(process.env.CONFIG);
var utils = require("../utils/utils.js");
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
// A partir d'un slidModel, créé un fichier de metadonnée et enregistre la donnée 
// présente dans un fichier 
SlidModel.create = function (slid, callback) {

        var slidData = slid.getData();
        fs.writeFile(CONFIG.contentDirectory + path.sep + slid.fileName, slidData);

        var metadataPath = utils.getMetaFilePath(slid.id);
        fs.writeFile(metadataPath, JSON.stringify(slid));
    }

// Lit un fichier métadata et affiche les données dans la console
SlidModel.read = function (id, callback) {

        var metadataPath = utils.getMetaFilePath(id);
        console.log("metadataPath" + metadataPath);
        fs.readFile(metadataPath, (err, data) => {
            if (err) {
                callback("Error reading metadata for id: " + id);
            }

            callback(null, new SlidModel(JSON.parse(data)));
        });
    }

// Prends un slidModel et mets à jour le fichier de métadonnées et la data
SlidModel.update = function (slid, callback) {

        var slidData = slid.getData();
        var metadataPath = utils.getMetaFilePath(slid.id);

        if(!slidData || slidData.length <= 0) {
            callback("Error updating metadata for id: " + slid.id);
        }

        fs.writeFile(slid.fileName, slidData);
        fs.writeFile(metadataPath, JSON.stringify(slid));
    }

// Supprime le fichier de métadonnées et le fichier de presentation
SlidModel.deletePres = function (id, callback) {
        fs.unlink(utils.getPresentationFilePath(id));
        fs.unlink(utils.getMetaFilePath(id));
    }

module.exports = SlidModel; // déclaration de la classe