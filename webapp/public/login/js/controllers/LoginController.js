angular.module('loginApp').controller('loginCtrl', loginCrtFnt);

loginCrtFnt.$inject = ['$scope', '$log', "$window", "auth"];

function loginCrtFnt($scope, $log, $window, auth) {

    $scope.user = {login:"", pwd:""};

    $scope.showUsers = function () {
        $log.info(auth.userList());
    }

    $scope.checkUser = function (user) {
        $scope.logAuthObject(user);
		
		auth.checkUser(user.login, user.pwd).then(function(successResult){

            if(successResult && successResult.validAuth) {
                if(successResult.role === "admin")
                    $window.location = "/admin";
                else
                    $window.location = "/watch";
            }
            else {
                alert("Connection Fail");
            }
        },
        function(failResult) {
            alert("Connection Fail");
        });
    }

    $scope.logAuth = function () {
        $log.info('user login', $scope.user.login);
        $log.info('user pwd', $scope.user.pwd);
    };

    $scope.logAuthObject = function (user) {
        $log.info('user login', user.login);
        $log.info('user pwd', user.pwd);
    };
}