describe("SubmitFareController", function () {
    //beforeEach(angular.mock.module('app')); //see if this is necessary    
    beforeEach(angular.mock.module('Guggenheim.controllers'));

    var $controller, $rootScope;

    beforeEach(inject(function (_$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching  
        $controller = _$controller_;
        //$rootScope = _$rootScope_;  
    }));

    beforeEach(inject(function ($rootScope) {
        //new a $scope
        $scope = $rootScope.$new();
        controller = $controller('SubmitFareController', { $scope: $scope });
    }));

    describe('$scope.SubmitFare', function () {
        it('uses the testing example provided by Guggenheim', function () {
            $scope.fare = {};
            $scope.fare = [
                {
                    StartFare: 3,
                    Minutes: 2,
                    Miles: 2,
                    Date: "2002-02-02T14:02:00.000Z",
                    Total: ""
                }
            ];
            //spyOn($scope, 'submitFare');
            $scope.SubmitFare($scope);
           


            
            expect($scope.TotalFare).toEqual('$7.70');
        });

        it('exists', function () {
            expect(controller).not.toBeNull();
        });
    });

});

