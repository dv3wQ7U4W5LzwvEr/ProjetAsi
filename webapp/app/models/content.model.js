"use strict";

var CONFIG = JSON.parse(process.env.CONFIG);
var fs = require("fs");
var path = require("path");

function ContentModel(contentModel) {

    // attributs publiques
    this.type = contentModel.type;
    this.id = contentModel.id;
    this.title = contentModel.title;
    this.fileName = contentModel.fileName;

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

// A partir d'un contentModel, créé un fichier de metadonnée et enregistre la donnée 
// présente dans un fichier 
ContentModel.create = function (content, callback) {

        var contentData = content.getData();
        fs.writeFile(CONFIG.contentDirectory + path.sep + content.fileName, contentData);

        var metadataPath = CONFIG.contentDirectory + path.sep + content.id + ".meta.json";
        fs.writeFile(metadataPath, JSON.stringify(content));
    }

// Lit un fichier métadata et affiche les données dans la console
ContentModel.read = function (id, callback) {

        var metadataPath = CONFIG.contentDirectory + path.sep + id + ".meta.json";
        console.log("metadataPath" + metadataPath);
        fs.readFile(metadataPath, (err, data) => {
            if (err) {
                callback("Error reading metadata for id: " + id);
            }

            callback(null, new ContentModel(JSON.parse(data)));
        });
    }

// Prends un contentModel et mets à jour le fichier de métadonnées et la data
ContentModel.update = function (content, callback) {

        var contentData = content.getData();
        var metadataPath = CONFIG.contentDirectory + path.sep + content.id + ".meta.json";

        if(!contentData || contentData.length <= 0) {
            callback("Error updating metadata for id: " + content.id);
        }

        fs.writeFile(content.fileName, contentData);
        fs.writeFile(metadataPath, JSON.stringify(content));
    }

// Supprime le fichier de métadonnées et le fichier de presentation
ContentModel.deletePres = function (id, callback) {
        fs.unlink(CONFIG.presentationDirectory + path.sep + id + ".pres.json");
        fs.unlink(CONFIG.contentDirectory + path.sep + content.id + ".meta.json");
    }

module.exports = ContentModel; // déclaration de la classe