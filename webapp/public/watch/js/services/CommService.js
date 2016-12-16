angular.module("commServices", []).factory("comm", commFnc);

function commFnc() {

    comm = {};
    comm.io = {};
    comm.io.socketConnection = function (scope, uuid) {

        var socket = io.connect();
        comm.io.uuid = uuid;

        socket.on('connection', function () {
            socket.emit('data_comm', { 'id': comm.io.uuid });
        });

        socket.on('currentSlidEvent', function (socket) {
            console.log("Receive slide : " + socket);
            scope.onCurrentSlide(socket);
        });

        return socket;
    }

    return comm;
}