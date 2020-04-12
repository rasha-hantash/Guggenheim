// this service is injected into the SubmitFareController in order for
// SubmiTaxiFare() to become accessbile to the SubmitFareController 
var app = angular.module("GuggenheimApp", ['ngRoute']);

app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/", {
            template: '<div submitform></div>',
            controller: "SubmitFareController"
        })
}]);

app.controller("SubmitFareController", function ($scope, $http) {
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

        // TODO: figure out why I'm still allowed to SubmitFare when user
        // enters a date with invalid Minutes and Miles values    
        if ($scope.fare.Minutes == undefined || $scope.fare.Miles == undefined) {
            alert("Please enter a minimum value of 0 for Minutes and Miles");
            return;
        }
        console.log("The request of the $scope.fare", $scope.fare);
        $http.post("/TaxiFare/SubmitFare", $scope.fare).then(function (response) {
            console.log("The response data", response.data);
            

            // sets the total fare in the response toteh $scope.fare.Total   
            $scope.fare.Total = response.data.Total;
            alert("Your total fare on, " + response.data.Date + ", is " + response.data.Total);
            console.log("The response of the $scope.fare", $scope.fare);

        }), (function () {
            alert("Sorry, your fare could not be processed at this time");
        });


    };
});

app.directive('submitform', function () {
        return {
            templateUrl: 'Templates/submitFare.html',

        };
});




 