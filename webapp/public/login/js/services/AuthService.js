angular.module('authService', []).service('auth', authFnc);

authFnc.$inject = ['$http', '$q'];

function authFnc($http, $q) {
    var userMap = {};
    userMap['jdoe'] = 'jdoepwd';
    userMap['psmith'] = 'psmithpwd';
    userMap['tp'] = 'tp';

    var fncContainer = {
        checkUser: checkUser,
        userList: userList
    };

    function checkUser(userlogin, userpwd) {

        var deferred = $q.defer();

        setTimeout(function (login, pwd) {
            if (userMap[login] == pwd) {
                var role = (login == 'tp') ? "admin" : "watcher";
                deferred.resolve({login:login, validAuth:true, role:role});
            } else {
                deferred.reject({login:login, validAuth:false, role:null});
            }
        }, 3000, userlogin, userpwd);

        return deferred.promise;
    };

    function authAsk(login,pwd) {

        var deferred = $q.defer();

        $http.post('/fakeauthwatcher', {'login': login, 'pwd': pwd})
            .success(function(data, status, headers, config) {
                //TODO Verifier si l'authentification est OK ou pas
                //TODO S'inspirer de la methode ci-dessus 'checkUser'
                deferred.resolve(data);
            })
            .error(function(data, status, headers, config) {
                deferred.reject("Error: status code " + status);
            });

        return deferred.promise;
    };

    function userList() {

        return userMap;
    };

    return fncContainer;
}
