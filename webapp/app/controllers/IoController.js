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

        socket.on('data_comm', function (data) {
            console.log("Client connected : " + data.id);
            mapUser[data.id] = socket;
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

            sendSlideToAll(currentPres.slidArray.length - 1);
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
        sendSlideToAll(currentSlideIndex);

        if (timer != null)
            clearInterval(timer);

        // Start presentation
        timer = setInterval(function () {
            sendSlideToAll(currentSlideIndex + 1);
        }, 2000);
    });
}

// Update current slide index and send it to every client
function sendSlideToAll(slideIndex) {

    if (currentPres == undefined || currentPres.slidArray == undefined) {
        console.log("Error: no presentation loaded");
        return;
    }

    // Update current slide index
    if (slideIndex >= 0 && slideIndex < currentPres.slidArray.length)
        currentSlideIndex = slideIndex;
    else
        return;

    console.log("Current slide index : " + currentSlideIndex);
    var currentSlide = currentPres.slidArray[currentSlideIndex];

    // Load slide content
    ContentModel.read(currentSlide.contentMap[1], function (err, slid) {
        
        if(err) {
            console.log("Error loading slide metadata : " + slid);
            return;
        }

        slid.src = "/contents/" + slid.id;
        sendToAll(slid);
    });
}

// Send data to every sockets
function sendToAll(data) {

    Object.keys(mapUser).forEach(function (key){
        mapUser[key].emit("currentSlidEvent", data);
    });
}