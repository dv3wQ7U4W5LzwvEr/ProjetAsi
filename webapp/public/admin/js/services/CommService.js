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

        $http.get('/resources_list')
            .success(function(data, status, headers, config) { deferred.resolve(data); })
            .error(function(data, status, headers, config) { deferred.reject(status); });

        return deferred.promise;
    };

    function loadPres(presName, presID) {

        var deferred = $q.defer();

        /*setTimeout(function() {
            deferred.resolve({ '1': { 'id': '6655416743', 'title': 'test', 'description': 'test', 'slidArray': [{ 'id': '455651646', 'title': 'testkk', 'txt': 'dsfgdslgsd', 'contentMap': { '1': './img/1.jpg' } }] } });
        }, 3000);*/

        $http.get('/loadPres')
            .success(function(data, status, headers, config) { deferred.resolve(data); })
            .error(function(data, status, headers, config) { deferred.reject(status); });

        return deferred.promise;
    };

    function savePres(pres) {

    };

    return comm;
};