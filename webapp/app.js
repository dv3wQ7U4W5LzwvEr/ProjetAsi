"use strict";

var path = require("path");
var http = require("http");
var express = require("express");
var bodyParser = require('body-parser');
var CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG);

var defaultRoute = require("./app/routes/default.route.js");
var presentationRoute = require("./app/routes/presentation.route.js");

// init server
var app = express();

app.use(bodyParser.json());

app.use(defaultRoute);
app.use(presentationRoute);

app.use("/login", express.static(path.join(__dirname, "public/login")));

var server = http.createServer(app);
server.listen(CONFIG.port);