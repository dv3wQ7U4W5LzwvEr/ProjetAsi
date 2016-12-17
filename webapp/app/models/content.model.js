"use strict";

var CONFIG = JSON.parse(process.env.CONFIG);

var utils = require("../utils/utils.js");

var fs = require("fs");
var path = require("path");

var ContentModel = (function () {

    // Constructeur
    function ContentModel(contentModel) {

        // attributs publiques
        this.type = contentModel.type;
        this.id = contentModel.id;
        this.title = contentModel.title;
        this.fileName = contentModel.fileName;
    }

    // Public function
    ContentModel.prototype.getData = function () {
        return this.data;
    };

    ContentModel.prototype.setData = function (data) {
        return this.data = data;
    };

    // Used to get this string representation of ContentModel without the private fields (data)
    ContentModel.prototype.toString = function () {
        return JSON.stringify(this, function (key, value) {
            if (key == "data") return undefined;
            else return value;
        });
    };

    // Static function

    // A partir d'un contentModel, créé un fichier de metadonnée et enregistre l'image 
    // présente dans le dossier des images
    ContentModel.create = function (content, callback) {

        // Save image file
        var contentData = content.getData();
        fs.writeFile(utils.getDataFilePath(content.fileName), contentData);

        // Save metadata (ContentModel in json)
        var metadataPath = utils.getMetaFilePath(content.id);
        fs.writeFile(metadataPath, content.toString());

        callback(null, content);
    };

    // Lit un fichier métadata et renvoi un objet ContentModel
    ContentModel.read = function (id, callback) {

        var metadataPath = utils.getMetaFilePath(id);

        fs.readFile(metadataPath, (err, data) => {
            if (err) {
                callback("Error reading metadata for id: " + id);
                return;
            }

            callback(null, new ContentModel(JSON.parse(data)));
        });
    };

    // Prends un contentModel et mets à jour le fichier de métadonnées et la data
    ContentModel.update = function (content, callback) {

        var contentData = content.getData();
        var metadataPath = utils.getMetaFilePath(content.id);

        if (!contentData || contentData.length <= 0) {
            callback("Error updating metadata for id: " + content.id);
            return;
        }

        fs.writeFile(content.fileName, contentData);
        fs.writeFile(metadataPath, content.toString());
    };

    // Supprime le fichier de métadonnées et le fichier de presentation
    ContentModel.deletePres = function (id, callback) {

        fs.unlink(utils.getPresentationFilePath(id));
        fs.unlink(utils.getMetaFilePath(content.id));
    }

    return ContentModel;
} ());

module.exports = ContentModel; // déclaration de la classe