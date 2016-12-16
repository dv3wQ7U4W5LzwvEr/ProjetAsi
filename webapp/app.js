"use strict";

var path = require("path");
var http = require("http");
var express = require("express");
var bodyParser = require('body-parser');

var CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG);

var IoController = require('./app/controllers/IoController.js');
var defaultRoute = require("./app/routes/default.route.js");
var presentationRoute = require("./app/routes/presentation.route.js");
var slidRoute = require("./app/routes/contents.route.js");

// Init server
var app = express();
app.use(bodyParser.json());

// Configure routes
app.use(defaultRoute);
app.use(presentationRoute);
app.use(slidRoute);

// Routes static
app.use("/login", express.static(path.join(__dirname, "public/login/")));
app.use("/admin", express.static(path.join(__dirname, "public/admin/")));
app.use("/watch", express.static(path.join(__dirname, "public/watch/")));

// Start server
var server = http.createServer(app);
server.listen(CONFIG.port);

// Start Socket.io
IoController.listen(server);