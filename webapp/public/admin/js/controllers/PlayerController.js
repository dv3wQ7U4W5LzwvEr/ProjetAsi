angular.module("adminApp").controller("playerCtrl", playerCtrl);

playerCtrl.$inject = ["$scope", "comm", "factory"];

function playerCtrl($scope, comm, factory) {

    this.initPlayer = function () {
        $scope.socket = comm.io.socketConnection($scope, factory.generateUUID());
    }

    this.pause = function () {
        comm.io.emitPause($scope.socket);
    }

    this.end = function () {
        comm.io.emitEnd($scope.socket);
    }

    this.begin = function () {
        comm.io.emitBegin($scope.socket);
    }

    this.backward = function () {
        comm.io.emitPrev($scope.socket);
    }

    this.forward = function () {
        comm.io.emitNext($scope.socket);
    }

    this.play = function (presId) {
        comm.io.emitStart($scope.socket, presId);
    }
}