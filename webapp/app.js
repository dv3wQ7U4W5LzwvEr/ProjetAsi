"use strict";

var path = require("path");
var http = require("http");
var express = require("express");
var bodyParser = require('body-parser');
var CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG);
var ContentModel = require('./app/models/content.model.js');

var defaultRoute = require("./app/routes/default.route.js");
var presentationRoute = require("./app/routes/presentation.route.js");
var slidRoute = require("./app/routes/contents.route.js");

// init server
var app = express();

app.use(bodyParser.json());

app.use(defaultRoute);
app.use(presentationRoute);
app.use(slidRoute);

app.use("/login", express.static(path.join(__dirname, "public/login")));

var server = http.createServer(app);
server.listen(CONFIG.port);


// Test de la fonction read
var slid;
ContentModel.read("37ba76b1-5c5d-47ef-8350-f4ea9407276d",function(error, slid){
    if(slid)
        console.log(slid);
});