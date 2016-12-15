'use strict';

var CONFIG = JSON.parse(process.env.CONFIG);
var utils = require("../utils/utils.js");
var fs = require("fs");
var path = require("path");

// Retourne la liste des slides
exports.list = function (req, res) {
    console.log("Méthode list");
    res.end();
}

// Créé la slide dont les informations sont dans la requête
exports.create = function (req, res) {
    console.log("Méthode create");
    res.end();
}

// Retourne la slide avec l'ID correspondante
exports.getSlide = function (req, res) {
    console.log("Méthode getSlide");
    res.end();
}