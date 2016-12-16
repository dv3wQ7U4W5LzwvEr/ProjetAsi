'use strict';

// Imports
var utils = require("../utils/utils.js");
var ContentModel = require("../models/content.model.js");
var io = require('socket.io');
var fs = require("fs");

// Global variables
var mapUser = {};
var timer = null;
var currentPres;
var currentSlideIndex = 0;

exports.listen = function (httpServer) {

    io = io.listen(httpServer);

    io.on('connection', function (socket) {
        console.log("Client connecting...");
        socket.emit('connection', '');

        socket.on('data_comm', function (socket) {
            console.log("Client connected: "+JSON.stringify(socket));
            mapUser[socket.id] = socket;
        });

        socket.on('slidEvent', function (data) {
            console.log("Slide event : " + JSON.stringify(data));
            onSlideEvent(data);
        });
    });
}

function onSlideEvent(data) {

    switch (data.CMD) {
        case "START":
            startPresentation(data.PRES_ID);
            break;
        case "PAUSE":
            if (timer != null)
                clearInterval(timer);
            break;
        case "END":
            if (currentPres === undefined || currentPres.slidArray === undefined) {
                console.log("Error: no presentation loaded");
                return undefined;
            }

            sendSlideToAll(currentPres.slidArray.length);
            break;
        case "BEGIN":
            sendSlideToAll(0);
            break;
        case "PREV":
            sendSlideToAll(currentSlideIndex - 1);
            break;
        case "NEXT":
            sendSlideToAll(currentSlideIndex + 1);
            break;
    }
}

function startPresentation(presId) {

    var presPath = utils.getPresentationFilePath(presId);
    
    fs.readFile(presPath, function (err, data) {
        if (err) {
            console.log("Error reading presentation : " + err);
            return;
        }

        // Init current presentation
        currentPres = JSON.parse(data);
        currentSlideIndex = 0;

        // Start presentation
        if (timer != null)
            clearInterval(timer);

        timer = setInterval(function () {
            sendSlideToAll(currentSlideIndex);
            currentSlideIndex++;
        }, 5000);
    });
}

function sendSlideToAll(slideIndex) {

    if (currentPres == undefined || currentPres.slidArray == undefined) {
        console.log("Error: no presentation loaded");
        return;
    }

    if (slideIndex >= 0 && slideIndex < currentPres.slidArray.length)
        currentSlideIndex = slideIndex;
    else
        return;

    var currentSlide = currentPres.slidArray[currentSlideIndex];

    // Load slide content
    ContentModel.read(currentSlide.id, function (err, slid) {
        slid.src = "/contents/" + slid.id;
        sendToAll(slid);
    });
}

// Send data to every sockets
function sendToAll(data) {

    console.log("Send all : " + data);
    mapUser.forEach(function (socket) {
        socket.emit("currentSlidEvent", data);
    });
}