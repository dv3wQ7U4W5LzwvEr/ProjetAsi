angular.module('commServices', []).factory('comm', commFnc);

commFnc.$inject = ['$http', '$q'];

function commFnc($http, $q) {

    var comm = {
        loadImages: loadImages,
        loadPres: loadPres,
        savePres: savePres
    };

    function loadImages(presName, presID) {

        var deferred = $q.defer();

        /*setTimeout(function() {
            deferred.resolve({ '1': { 'src': './img/1.jpg', 'title': '1' }, '2': { 'src': './img/2.jpg', 'title': '2' }, '3': { 'src': './img/3.jpg', 'title': '3' } });
        }, 3000);*/

        $http.get('/contents')
            .success(function (data, status, headers, config) { deferred.resolve(data); })
            .error(function (data, status, headers, config) { deferred.reject(status); });

        return deferred.promise;
    };

    function loadPres(presName, presID) {

        var deferred = $q.defer();

        /*setTimeout(function() {
            deferred.resolve({ '1': { 'id': '6655416743', 'title': 'test', 'description': 'test', 'slidArray': [{ 'id': '455651646', 'title': 'testkk', 'txt': 'dsfgdslgsd', 'contentMap': { '1': './img/1.jpg' } }] } });
        }, 3000);*/

        $http.get('/loadPres')
            .success(function (data, status, headers, config) { deferred.resolve(data); })
            .error(function (data, status, headers, config) { deferred.reject(status); });

        return deferred.promise;
    };

    function savePres(pres) {

    };

    // Order for watcher clients
    comm.io = {};
    comm.io.socketConnection = function (scope, uuid) {

        var socket = io.connect();
        comm.io.uuid = uuid;

        socket.on('connection', function () {
            socket.emit('data_comm', { 'id': comm.io.uuid });
        });
        
        socket.on('newPres', function (socket) {

        });

        socket.on('slidEvent', function (socket) {

        });

        return socket;
    }

    comm.io.emitPrev = function (socket) {
        socket.emit('slidEvent', { 'CMD': "PREV" });
    }
    
    comm.io.emitNext = function (socket) {
        socket.emit('slidEvent', { 'CMD': "NEXT" });
    }

    comm.io.emitStart = function (socket, presUUID) {
        socket.emit('slidEvent', { 'CMD': "START", 'PRES_ID': presUUID });
    }

    comm.io.emitPause = function (socket) {
        socket.emit('slidEvent', { 'CMD': "PAUSE" });
    }

    comm.io.emitBegin = function (socket) {
        socket.emit('slidEvent', { 'CMD': "BEGIN" });
    }

    comm.io.emitEnd = function (socket) {
        socket.emit('slidEvent', { 'CMD': "END" });
    }

    return comm;
};