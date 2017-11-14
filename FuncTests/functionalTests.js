var selenium = require('selenium-webdriver')
var chai = require('chai')
chai.use(require('chai-as-promised'))
var expect = chai.expect
var test = require('selenium-webdriver/testing')

var siteAddress = 'http://localhost:1337/'
var statisticsAddress = 'stat?event='
var feedbackAddress = 'feedback?event='
var numberOfButtons = 4
var statAttNamePrefix = 'stat'
var buttonAttNamePrefix = 'button'

console.log('-----------------------------------------------')

function checkButtonStatistics (ID, driver, test) {
  driver.get(siteAddress + statisticsAddress + test)
    .then(function () {
      driver.findElement(selenium.By.id(statAttNamePrefix + ID))
        .getText()
        .then(statBeforeClickStr => {
          var statBeforeClick = +statBeforeClickStr
          driver.get(siteAddress + feedbackAddress + test).then(() => {
            driver.findElement(selenium.By.id(buttonAttNamePrefix + ID))
              .then(button => {
                button.click().then(() => {
                  driver.get(siteAddress + statisticsAddress + test).then(() => {
                    driver.findElement(selenium.By.id(statAttNamePrefix + ID))
                      .getText()
                      .then(statAfterClickStr => {
                        var statAfterClick = +statAfterClickStr
                        expect(statAfterClick).equals(statBeforeClick + 1, 'stat not increased by one on stat ' + ID)
                      })
                  })
                })
              })
          })
        }, function () { console.log("couldn't find!") })
    })
}

test.describe('My Inner Suite 1', function () {
  var driver
  var currentTest = 'TEST@' + (new Date()).getMilliseconds()

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
    driver.get(siteAddress + feedbackAddress + currentTest)
      .then(function () {
        driver.getTitle().then(function (title) {
          expect(title).equals('Feedback!', 'Title not as expected')
        })
      })
  })

  test.it('check buttons/statistics', function () {
    for (var i = 0; i < numberOfButtons; i++) {
      checkButtonStatistics(i, driver, currentTest)
      console.log('HHHH')
    }
  })
})
