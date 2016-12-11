angular.module("adminApp").controller("eventCtrl", eventCtrl);

eventCtrl.$inject = ['$scope', '$log', '$window', 'factory', 'comm'];

function eventCtrl($scope, $log, $window, factory, comm) {

    $scope.currentSlide = {};
    $scope.currentPresentation = factory.presentationCreation("template_pres", "description of the template présentation");

    $scope.contentMap = {};
    $scope.contentMap.payload = "";

    $scope.presentationMap = {};
    $scope.presentationMap.payload = "";

    var available_content = comm.loadImages('test', 'test');
    available_content.then(
        function (payload) {
            $scope.contentMap.payload = payload;
            $scope.contentMap.array = factory.mapToArray(payload);
        },
        function (errorPayload) {
            $log.error('failure loading images', errorPayload);
        });

    var firstPresentation = comm.loadPres('test', 'test');
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

    $scope.selectCurrentSlide = function (slide) {

        $scope.currentSlide = slide;
    }

    $scope.savePres = function () {

        comm.savePres($scope.currentPresentation);
    }

    $scope.isSlideContentEmpty = function (slide) {

        return slide == undefined || slide.contentMap == undefined || slide.contentMap[1] == undefined;
    }

    $scope.getFirstSlideImagePath = function (slide) {

        if ($scope.isSlideContentEmpty(slide)) return "";
        return slide.contentMap[1];
    }

    $scope.onDropComplete = function (data, evt) {

        if ($scope.currentSlide == undefined) return;

        $scope.currentSlide.contentMap[1] = data.src;
        $scope.$apply();

        console.log("drop success, data:", data);
    }

    $scope.onDragComplete = function (data, evt) {

        console.log("drag success, data:", data);
    }
}