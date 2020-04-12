describe('angularjs submit fare functionaly', function () {

    it('should submit a fare with primary example', function () {
        browser.get('http://127.0.0.1:8080/#!/');
        element(by.id('minutes')).sendKeys(5);
        element(by.id('miles')).sendKeys(2);
        element(by.id('dateOfFare')).click().clear().sendKeys('10-08-2020');
        element(by.id('dateOfFare')).sendKeys(protractor.Key.TAB);
        element(by.id('dateOfFare')).sendKeys('5:30');
        element(by.id('dateOfFare')).sendKeys('PM');
        element(by.id('submitButton')).click();

        browser.sleep(1000);

        let alert = browser.switchTo().alert();
        alert.getText().then(function (message) {
            console.log("MSG is: " + message);
            // check to see if expected value is recieved  
            { expect(message.split(" ").splice(-1).toString()).toBe("$9.75") }
        });
        
        browser.sleep(2000);
        alert.accept();
    });



    it('should not allow a user to input negative values for Miles or Minutes', function () {
        browser.get('http://127.0.0.1:8080/#!/');
        element(by.id('minutes')).sendKeys(-1);
        element(by.id('miles')).sendKeys(-1);
        element(by.id('dateOfFare')).click().clear().sendKeys('10-08-2020');
        element(by.id('dateOfFare')).sendKeys(protractor.Key.TAB);
        element(by.id('dateOfFare')).sendKeys('5:30');
        element(by.id('dateOfFare')).sendKeys('PM');
        element(by.id('submitButton')).click();

        browser.sleep(1000);

        let alert = browser.switchTo().alert();
        alert.getText().then(function (message) {
            console.log("MSG is: " + message);
            // check to see if expected value is recieved  
            { expect(message.toString()).toBe("Please enter a minimum value of 0 for Minutes and Miles") }
        });

        browser.sleep(2000);
        alert.accept();
    });


});

// TODO: test for invalid values