angular.module("Guggenheim.controllers", []).
    // this service is injected into the SubmitFareController in order for
    // SubmiTaxiFare() to become accessbile to the SubmitFareController 
    controller("SubmitFareController", function ($scope, $http) {
        $scope.fare = {
            StartFare: "",
            Minutes: "",
            Miles: "",
            Date: "",
            Total: ""
        };
        $scope.TotalFare = "";
        

        // calls onSubmitFare()  on when user clicks on the submit button.
        // makes a call for SubmitTaxiFare() from the FareService
        $scope.SubmitFare = function () {

            console.log("The request of the $scope.fare", $scope.fare);
            $http.post("/TaxiFare/SubmitFare", $scope.fare).then(function (response) {
                console.log("The response data", response.data);
                alert("Your total fare on, " + response.data.Date + ", is " + response.data.Total);
                
                // sets the total fare in the response toteh $scope.fare.Total  
                $scope.fare.Total = response.data.Total;
                console.log("The response of the $scope.fare", $scope.fare);
            }), (function () {
                alert("Sorry, your fare could not be processed at this time");
            });
       
        }
        
    });