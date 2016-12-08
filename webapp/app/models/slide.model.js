"use strict";

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

    }

    static function read(id, callback) {

    }

    static function update(slid, callback) {

    }

    static function delete(id, callback) {
        
    }
}