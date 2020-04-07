var app = angular.module('MyApp', ["Guggenheim.controllers", "ngRoute"]);

app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "SubmitFare.html",
            controller: "SubmitFareController"
        }).
        otherwise({ redirectTo: "/" })
}]);
 

    
    


 