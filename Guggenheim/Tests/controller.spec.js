describe("SubmitFareController", function () {
    var $httpBackend, $rootScope, createController;
    beforeEach(module('Guggenheim.controllers'));

    beforeEach(inject(function ($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');

        // Get hold of a scope (i.e. the root scope) 
        $rootScope = $injector.get('$rootScope');
        // The $controller service is used to create instances of controllers
        let $controller = $injector.get('$controller');

        createController = function () {
            return $controller('SubmitFareController', { '$scope': $rootScope });
        };
    }));


    afterEach(function () {;
       $httpBackend.verifyNoOutstandingExpectation();
       $httpBackend.verifyNoOutstandingRequest();
    });

    // A simple test to verify the controller is defined
    it('should exist', function () {
        expect($rootScope).toBeDefined();
    });

    it('should submit a fare and get back the total fare', function () {
        let controller = createController();
        $rootScope.fare = {};
            $rootScope.fare = 
                {
                    StartFare: 3,
                    Minutes: 2,
                    Miles: 2,
                    Date: "2002-02-02T14:02:00.000Z",
                    Total: ""
                }
        ;
        $rootScope.Total = "";

        // the controller will still send the request and
        // $httpBackend will respond without you having to
        // specify the expectation and response for this request 
        $httpBackend.expectPOST('/TaxiFare/SubmitFare', $rootScope.fare).respond(201,
            {StartFare: 3, Minutes: 2, Miles: 2, Date: '10/08/2010 5:30:00 PM', Total: '$9.75'});

        $rootScope.SubmitFare();

        expect($rootScope.fare.Total).toBe('');
        $httpBackend.flush();
        expect($rootScope.fare.Total).toBe('$9.75');
    });


});

   