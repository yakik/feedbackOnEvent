var selenium = require ('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var chai = require('chai');
chai.use(require('chai-as-promised'));
var expect = chai.expect;
var test = require('selenium-webdriver/testing');

test.describe("My Inner Suite 1", function(){

    var driver;

    test.before(function(){

        driver = new selenium.Builder()
            .forBrowser('chrome')
            .build();
        this.timeout(10000);


    });

    test.after(function(){

        driver.quit();

    });

    test.beforeEach(function(){

        driver.get('http://feedbackagilesparks.azurewebsites.net/');

    });

    test.afterEach(function(){

        // do something after test case execution is finished
        // no matter if there are failed cases

    });

    test.it("Test-1", function() {
        driver.getTitle().then(function (title) {
            // google page title should be printed
            expect(title).to.equal('Agaaaaile Sparks Event Feedback');

        });
    });


    test.it("Test-2", function(){


               });



    test.it("Test-3", function(){


        });


});