'use strict';

// Imports
var utils = require("../utils/utils.js");
var SlidModel = require("../models/slide.model.js");
var io = require('socket.io');
var fs = require("fs");

// Global variables
var mapUser = {};
var timer = null;
var currentPres;
var currentSlideIndex;

exports.listen = function (httpServer) {

    io.listen(httpServer);

    io.sockets.on('connection', function (socket) {
        socket.emit('connection', '');
    });

    io.sockets.on('data_comm', function (socket) {
        mapUser[socket.id] = io.sockets;
    });

    io.sockets.on('slidEvent', function (socket) {
        onSlideEvent(socket);
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
        currentPres = data;
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

    if (currentPres === undefined || currentPres.slidArray === undefined) {
        console.log("Error: no presentation loaded");
        return;
    }

    if (slideIndex >= 0 && slideIndex < currentPres.slidArray.length)
        currentSlideIndex = slideIndex;
    else
        return; 

    var currentSlide = currentPres.slidArray[currentSlideIndex];

    // Load slide content
    SlidModel.read(currentSlide.id, function (err, slid) {
        slid.src = "/contents/" + slid.id;
        sendToAll(slid);
    });
}

// Send data to every sockets
function sendToAll(data) {

    mapUser.forEach(function (socket) {
        socket.emit("slidEvent", data);
    });
}