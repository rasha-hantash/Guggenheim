describe("submitting a taxi fare", function () {
    let $httpBackend, $rootScope, createController;
    beforeEach(module('GuggenheimApp'));

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

    //Verifies that all of the requests defined via the expect api were made
    // Verifies no outstanding requests need to be flushed
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
        };

        // the controller will still send the request and
        // $httpBackend will respond without you having to
        // specify the expectation and response for this request    
        $httpBackend.expectPOST('/TaxiFare/SubmitFare', $rootScope.fare).respond(201,
            { StartFare: 3, Minutes: 2, Miles: 2, Date: '10/08/2010 5:30:00 PM', Total: '$9.75' });

        $rootScope.SubmitFare();

        expect($rootScope.fare.Total).toBe('');
        //preserves the async api of the backend, while allowing the test to execute synchronously.
        $httpBackend.flush();
        expect($rootScope.fare.Total).toBe('$9.75');
    });


    it('should not allow a user to input negative values for Miles or Minutes', function () {
        let controller = createController();
        $rootScope.fare = {};
        $rootScope.fare =
        {
            StartFare: 3,
            Minutes: -1,
            Miles: -1,
            Date: "2002-02-02T14:02:00.000Z",
            Total: ""
        };

        $rootScope.SubmitFare();

        expect($rootScope.fare.Total).toBe('');
        //preserves the async api of the backend, while allowing the test to execute synchronously.
    });


});


describe('testing the routes', function () {
    // Set up the module 
    beforeEach(module('GuggenheimApp'));

    let location, route, rootScope;

    beforeEach(inject(
        function (_$location_, _$route_, _$rootScope_) {
            location = _$location_;
            route = _$route_;

            // Get hold of a scope (i.e. the root scope)
            rootScope = _$rootScope_;
        }));

    describe('the / route', function () {



        it('should load the submit fare page on successful load of /', function () {

            expect(route.current).toBeUndefined();
            location.path('/');
            rootScope.$digest();

            expect(route.current.template).toBe('<div submitform></div>');
            expect(route.current.controller).toBe('SubmitFareController');

        });
    });
});

// TODO: test for invalid input
