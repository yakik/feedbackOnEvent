var selenium = require('selenium-webdriver')
var chai = require('chai')
chai.use(require('chai-as-promised'))
var expect = chai.expect
var test = require('selenium-webdriver/testing')
var FuncTestRef = require('./funcTestRef')
var EventDriver = require('./eventDriver')

test.describe('Functional Test 1', function () {
  var driver
  var reference = new FuncTestRef('http://localhost:1337/')

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

  test.it('check buttons/statistics - one event', function () {
    var testedEvent = 'ScrumMasters1234'
    var testEventDriver = new EventDriver(driver, reference, 5)
    testEventDriver
      .addEvent(testedEvent).then(() => {
        testEventDriver.openFeedbackPage().then(() => {
          testEventDriver.clickSmiley(testedEvent, 3).then(() => {
            testEventDriver.getStatsForEvent(testedEvent).then((stats) => {
              expect(stats[3]).equals(1, 'counter not 1')
            })
          })
        })
      }).catch(err => { console.log(err) })
  })
})
