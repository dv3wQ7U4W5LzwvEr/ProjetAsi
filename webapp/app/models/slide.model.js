"use strict";

var CONFIG = JSON.parse(process.env.CONFIG);
var fs = require("fs");

function SlidModel(slidModel) {

    // Public
    this.type = slidModel.type;
    this.id = slidModel.id;
    this.title = slidModel.title;
    this.fileName = slidModel.fileName;

    // Private
    var data;

    function getData() {
        return data;
    }

    function setData(data) {
        this.data = data;
    }

    static function create(slid, callback) {

        var slidData = slid.getData();
        fs.writeFile(slid.fileName, slidData);

        var metadataPath = CONFIG.contentDirectory + "/" + slid.id + ".meta.json";
        fs.writeFile(metadataPath, JSON.stringify(slid));
    }

    static function read(id, callback) {

        var metadataPath = CONFIG.contentDirectory + "/" + id + ".meta.json";
        fs.readFile(metadataPath, (err, data) => {
            if (err) {
                callback("Error reading metadata for id: " + id);
            }

            callback(null, new SlidModel(JSON.parse(data)));
        });
    }

    static function update(slid, callback) {

        var slidData = slid.getData();
        var metadataPath = CONFIG.contentDirectory + "/" + slid.id + ".meta.json";

        if(!slidData || slidData.length <= 0) {
            callback("Error updating metadata for id: " + slid.id);
        }

        fs.writeFile(slid.fileName, slidData);
        fs.writeFile(metadataPath, JSON.stringify(slid));
    }

    static function deletePres(id, callback) {

        fs.unlink(CONFIG.presentationDirectory + "/" + id + ".pres.json");
        fs.unlink(CONFIG.contentDirectory + "/" + slid.id + ".meta.json");
    }
}