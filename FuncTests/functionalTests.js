var selenium = require ('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var chai = require('chai');
chai.use(require('chai-as-promised'));
var expect = chai.expect;
var test = require('selenium-webdriver/testing');


console.log("-----------------------------------------------");



function checkButtonStatistics (ID, driver, test) {
    driver.get("http://localhost:1337/stat?event=" + test)
        .then(function () {
            driver.findElement(selenium.By.id("stat " + ID))
                .getText(function (statBeforeClick) {
                    expect(statBeforeClick).to.be.an('integer').greaterThan(-1);
                    driver.get("http://localhost:1337/feedback?event=" + test)
                        .findElement(selenium.By.id("button " + ID))
                        .click().then(function () {
                        driver.get("http://localhost:1337/stat?event=" + test)
                            .findElement(selenium.By.id("stat " + ID))
                            .getText(function (statAfterClick) {
                                expect(statAfterClick).to.be.equalTo(statBeforeClick + 1, "stat not increased by one");
                            })
                    })
                })
        })
}


test.describe("My Inner Suite 1", function(){

    var driver;
    var currentTest= "TEST@" + (new Date()).getMilliseconds();

    test.before(function(){

        driver = new selenium.Builder()
            .forBrowser('chrome')
            .build();
        this.timeout(10000);


    });

    test.after(function(){

     //   driver.quit();

    });

    test.beforeEach(function(){
  //      driver.get("http://localhost:1337/feedback?event="+currentTest);

    });

    test.afterEach(function(){

        // do something after test case execution is finished
        // no matter if there are failed cases

    });

    test.it("Test Page Title", function() {
        driver.get("http://localhost:1337/feedback?event="+currentTest)
            .then(function(){
            driver.getTitle().then(function (title) {
                expect(title).equals("Feedback!", "Title not as expected");
            })})
    });

    test.it("check buttons/statistics", function(){
        for (var i = 0; i < 4; i++)
            checkButtonStatistics (i, driver, currentTest);

    });





});
