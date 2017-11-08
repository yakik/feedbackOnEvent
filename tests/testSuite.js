var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    firefox = require('selenium-webdriver/firefox');

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions( /* … */)
    .build();

describe( 'Test Suite' , function(){

    before(function(){

        driver.get( my_service );
        driver.findElement(webdriver.By.id(username)).sendKeys(my_username);

        // a promise is returned while ‘click’ action
        // is registered in ‘driver’ object
        return driver.findElement(webdriver.By.id(submit)).click();
    });

    after(function(){

        return driver.quit();

    });

    it( 'Test Case', function(){

        driver.getTitle().then(function(title){
            expect(title).equals(my_title);
        })