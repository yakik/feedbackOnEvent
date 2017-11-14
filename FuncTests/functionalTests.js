var selenium = require('selenium-webdriver')
var chai = require('chai')
chai.use(require('chai-as-promised'))
var expect = chai.expect
var test = require('selenium-webdriver/testing')
var ReferenceSetup = require('../referenceSetup')

var referenceSetup = new ReferenceSetup()
var siteAddress = referenceSetup.siteAddress
var statisticsAddressPrefix = referenceSetup.statisticsAddressPrefix
var feedbackAddressPrefix = referenceSetup.feedbackAddressPrefix
var numberOfFeedbackRungs = referenceSetup.numberOfFeedbackRungs
var statElementIDPrefix = referenceSetup.statElementIDPrefix
var buttonElementIDPrefix = referenceSetup.buttonElementIDPrefix

var currentTest = 'TEST@' + (new Date()).getMilliseconds()

console.log('--------' + siteAddress)

function checkButtonStatistics (ID, driver, test) {
  driver.get(siteAddress + statisticsAddressPrefix + test)
    .then(function () {
      driver.findElement(selenium.By.id(statElementIDPrefix + ID))
        .getText()
        .then(statBeforeClickStr => {
          var statBeforeClick = +statBeforeClickStr
          driver.get(siteAddress + feedbackAddressPrefix + test).then(() => {
            driver.findElement(selenium.By.id(buttonElementIDPrefix + ID))
              .then(button => {
                button.click().then(() => {
                  driver.get(siteAddress + statisticsAddressPrefix + test).then(() => {
                    driver.findElement(selenium.By.id(statElementIDPrefix + ID))
                      .getText()
                      .then(statAfterClickStr => {
                        var statAfterClick = +statAfterClickStr
                        expect(statAfterClick).equals(statBeforeClick + 1, 'stat not increased by one on stat ' + ID)
                      }, promiseError)
                  }, promiseError)
                }, promiseError)
              }, promiseError)
          }, promiseError)
        }, promiseError)
    }, promiseError)

  function promiseError (err) {
    throw err
  }
}

test.describe('My Inner Suite 1', function () {
  var driver

  test.before(function () {
    driver = new selenium.Builder()
      .forBrowser('chrome')
      .build()
    this.timeout(10000)
  })

  test.after(function () {
    driver.quit()
  })

  test.beforeEach(function () {
  })

  test.afterEach(function () {

    // do something after test case execution is finished
    // no matter if there are failed cases

  })

  test.it('Test Page Title', function () {
    driver.get(siteAddress + feedbackAddressPrefix + currentTest)
      .then(function () {
        driver.getTitle().then(function (title) {
          expect(title).equals('Feedback!', 'Title not as expected')
        })
      })
  })

  test.it('check buttons/statistics', function () {
    for (var i = 0; i < numberOfFeedbackRungs; i++) {
      checkButtonStatistics(i.toString(), driver, currentTest)
    }
  })
})
