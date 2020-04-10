// module that depends on ngRoute for routing
var app = angular.module('MyApp', ["Guggenheim.controllers", "ngRoute"]);

//configures url endpoints and binds SubmitFare.html and SubmitFareController 
//to the "/" endpoint.
app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "Templates/SubmitFare.html",
            controller: "SubmitFareController"
        }).
        otherwise({ redirectTo: "/" })
}]);
 

    
    


 