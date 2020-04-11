describe('Testing routes', function () {
    beforeEach(module('MyApp'));

    let location, route, rootScope;

    beforeEach(inject(
        function (_$location_, _$route_, _$rootScope_) {
            location = _$location_;
            route = _$route_;
            rootScope = _$rootScope_;
        }));

    describe('/ route', function () {
        beforeEach(inject(
            function ($httpBackend) {
                $httpBackend.expectGET('Templates/SubmitFare.html')
                    .respond(200);
            }));

        it('should load the submit fare page on successful load of /', function () {

            expect(route.current).toBeUndefined();
            location.path('/');
            rootScope.$digest();

            expect(route.current.templateUrl).toBe('Templates/SubmitFare.html');
            expect(route.current.controller).toBe('SubmitFareController');

        });
    });
});