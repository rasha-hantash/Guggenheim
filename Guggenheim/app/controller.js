angular.module("Guggenheim.controllers", []).
    controller("SubmitFareController", function ( $scope, FareService){
        $scope.fare = {
            StartFare: "",
            Minutes: "",
            Miles: "",
            Date: "",
            Total: ""
        };
        $scope.TotalFare = "";
        //console.log("The before SubmitFare request of the fare", $scope.fare);
        $scope.SubmitFare = function () {
            console.log("The request of the $scope.fare", $scope.fare);
            FareService.SubmitTaxiFare($scope.fare);
           
            console.log("The response of the $scope.fare", $scope.fare);
        }

        console.log("Log scope afterwards", $scope.fare); // why is it not persistent  
    })
    .factory("FareService", ['$http', '$q', function ($http, $q) {
        var oFare = {};
        oFare.SubmitTaxiFare = function ($scope) {
            var def = $q.defer();
            var rand = {};
            rand = $scope;
            $http.post("/TaxiFare/SubmitFare", rand).then(function (response){
                console.log("The response of the fare", response.data);
                //var sum = response.data.Total;
                //fare.Total = sum;
                //console.log("Log scope inside submit fari", fare);

                alert("Your total fare on, " + response.data.Date + ", is " + response.data.Total);
                $scope.TotalFare = response.data.Total;
                console.log("Scope inside submite fare", $scope);
                
                def.resolve(response);
            })
              .catch(function (err, response){
                def.reject(err);
                })
            return def.promise;
        }

    return oFare;
    }])