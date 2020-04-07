angular.module("Guggenheim.controllers", []).
    controller("SubmitFareController", function ($scope, FareService){
        $scope.message = "Enter you details";
        

        $scope.SubmitFare = function () {
            FareService.SubmitTaxiFare($scope.fare);
        }
    })
    .factory("FareService", ['$http', function ($http) {
        var oFare = {};
        oFare.SubmitTaxiFare = function (fare)
        {
            $http.post("/TaxiFare/SubmitFare", fare).then(function (response){
                console.log(response.data);
                alert(response.data.message);
            })
        }
    return oFare;
    }])
//app.controller('FareController', function ($scope, TaxiFareService) {
//$scope.fare = {
//    startFare: 3,
//    minutes: "",
//    miles: "",
//    date: "",
//    total: ""
//};

//$scope.submitFare = function () {
//    //$http.post('/Index').then(function (response)){
//    //    $scope.total = response.data.total;
//    //}
//    //alert("From Method Call" + scope.message);

//    TaxiFareService.SubmitFare($scope.fare);
//}
//})
//    .factory("TaxiFareService", ['$http', function ($http) {
//    var totalFare = {};
//    fare.SubmitFare = function (fare) {
//        $http.post("/TaxiFare/SubmitFare", fare).success(function (response) {
//            alert(response.data);
//        })
//    }

//    return totalFare;
//}]);