﻿angular.module("Guggenheim.controllers", []).
    controller("SubmitFareController", function ( $scope, FareService){
        
        

        $scope.SubmitFare = function () {
            console.log("The request of the fare", $scope.fare);
            FareService.SubmitTaxiFare($scope.fare);
        }
    })
    .factory("FareService", ['$http', '$q', function ($http, $q) {
        var oFare = {};
        oFare.SubmitTaxiFare = function (fare) {
            var def = $q.defer();
            $http.post("/TaxiFare/SubmitFare", fare).then(function (response){
                console.log("The response of the fare", response.data);
                alert("Your total fare on, " + response.data.Date + ", is " + response.data.Total);
                def.resolve(response);
            })
              .catch(function (err, status){
                def.reject(err);
                })
            return def.promise;
        }

    return oFare;
    }])