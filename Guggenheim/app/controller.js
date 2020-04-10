angular.module("Guggenheim.controllers", []).
    //this service is injected into the SubmitFareController in order for
    //SubmiTaxiFare() to become accessbile to the SubmitFareController 
    controller("SubmitFareController", function ( $scope, FareService){
        $scope.fare = {
            StartFare: "",
            Minutes: "",
            Miles: "",
            Date: "",
            Total: ""
        };
        $scope.TotalFare = "";
        console.log("The request of the $scope.fare", $scope.fare);

        //calls onSubmitFare()  on when user clicks on the submit button.
        //makes a call for SubmitTaxiFare() from the FareService   
        $scope.SubmitFare = function () {
            
            FareService.SubmitTaxiFare($scope.fare);
        }
        console.log("The response of the $scope.fare", $scope.fare);
    })
    //inject $http to make the post call
    //inject the $q service to resolve promises when appropriate
    .factory("FareService", ['$http', '$q', function ($http, $q) {
        //fare object created in order to add function calls
        var oFare = {};
        oFare.SubmitTaxiFare = function ($scope) {
            var def = $q.defer();
            var scopeFare = {};
            scopeFare = $scope;
            $http.post("/TaxiFare/SubmitFare", scopeFare).then(function (response){
                console.log("The response", response.data);
              

                alert("Your total fare on, " + response.data.Date + ", is " + response.data.Total);
                $scope.TotalFare = response.data.Total;
                
                def.resolve(response);
            })
              .catch(function (err, response){
                def.reject(err);
                })
            return def.promise;
        }

    return oFare;
    }])



//angular.module("Guggenheim.controllers", []).
//    //this service is injected into the SubmitFareController in order for
//    //SubmiTaxiFare() to become accessbile to the SubmitFareController 
//    controller("SubmitFareController", function ($scope, FareService) {
//        $scope.fare = {
//            StartFare: "",
//            Minutes: "",
//            Miles: "",
//            Date: "",
//            Total: ""
//        };
//        $scope.TotalFare = "";

//        //calls onSubmitFare()  on when user clicks on the submit button.
//        //makes a call for SubmitTaxiFare() from the FareService  
//        $scope.SubmitFare = function () {
//            console.log("The request of the $scope.fare", $scope.fare);
//            FareService.SubmitTaxiFare($scope.fare);

//            console.log("The response of the $scope.fare", $scope.fare);
//        }

//        console.log("Log scope afterwards", $scope.fare); // why is it not persistent  
//    })
//    //inject $http to make the post call
//    //inject the $q service to resolve promises
//    .factory("FareService", ['$http', '$q', function ($http, $q) {

//        //fare object created in order to add function calls 
//        var oFare = {};
//        oFare.SubmitTaxiFare = function ($scope) {

//            //$q.defer() returns an object that we can use to create a promise
//            //perform some asynchronous operation, resolve or reject the promise when appropriate.
//            var def = $q.defer();

//            //$scope data is stored in scopeFare and passed into post request
//            var scopeFare = {};
//            scopFare = $scope;
//            $http.post("/TaxiFare/SubmitFare", scopeFare).then(function (response) {

//                //sends an alert to the user with the date and cost of their fare
//                console.log("The response of the fare", response.data);
//                alert("Your total fare on, " + response.data.Date + ", is " + response.data.Total);
//                $scope.TotalFare = response.data.Total;


//                def.resolve(response);
//            })
//                .catch(function (err, response) {
//                    def.reject(err);
//                })
//            return def.promise;
//        }

//        return oFare;
//    }])