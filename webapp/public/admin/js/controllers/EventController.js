angular.module("adminApp").controller("eventCtrl", eventCtrl);

eventCtrl.$inject = ['$scope', '$log', '$window', 'factory', 'comm'];

function eventCtrl($scope, $log, $window, factory, comm) {

    $scope.currentSlide = {};
    $scope.currentPresentation = factory.presentationCreation("template_pres", "description of the template présentation");

    $scope.contentMap = {};
    $scope.contentMap.payload = "";

    $scope.presentationMap = {};
    $scope.presentationMap.payload = "";

    // Loading images
    var available_content = comm.loadImages('', '');
    available_content.then(
        function (payload) {
            $scope.contentMap.payload = payload;
            $scope.contentMap.array = factory.mapToArray(payload);
        },
        function (errorPayload) {
            $log.error('failure loading images', errorPayload);
        });

    // Loading first presentation
    var firstPresentation = comm.loadPres('', '');
    firstPresentation.then(
        function (payload) {
            $scope.presentationMap.payload = payload;

            for (key in $scope.presentationMap.payload)
                $scope.currentPresentation = $scope.presentationMap.payload[key];
        },
        function (errorPayload) {
            $log.error('failure loading presentation', errorPayload);
        });

    $scope.newSlide = function () {

        var slid = factory.slidCreation("slide-Title", "slide-text");
        $scope.currentPresentation.slidArray.push(slid);
    }

    $scope.removeSlide = function () {

        if ($scope.currentSlide == undefined) return;

        for (var i = 0; i < $scope.currentPresentation.slidArray.length; i++) {
            var elem = $scope.currentPresentation.slidArray[i];

            if (elem.id == $scope.currentSlide.id) {
                $scope.currentPresentation.slidArray.splice(i, 1);
                $scope.currentSlide = {};
                return;
            }
        }
    }

    $scope.selectCurrentSlide = function (slide) {

        $scope.currentSlide = slide;
    }

    $scope.savePres = function () {

        comm.savePres($scope.currentPresentation).then(
            function (data) {
                alert("Presentation saved");
                console.log("Presentation saved : " + data);
            },
            function (error) {
                alert("Error saving presentation");
                console.log("Error saving presentation : " + error);
            });
    }

    $scope.isSlideContentEmpty = function (slide) {

        return slide == undefined || slide.contentMap == undefined || slide.contentMap[1] == undefined;
    }

    $scope.onDropComplete = function (data, evt) {

        if ($scope.currentSlide === undefined || $scope.currentSlide.contentMap === undefined) return;

        $scope.currentSlide.contentMap[1] = data.id;
        $scope.$apply();
    }

    $scope.onDragComplete = function (data, evt) {

    }
}