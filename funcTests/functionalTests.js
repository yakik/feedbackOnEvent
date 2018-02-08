var selenium = require('selenium-webdriver')
var chai = require('chai')
chai.use(require('chai-as-promised'))
var expect = chai.expect
var test = require('selenium-webdriver/testing')
var FuncTestRef = require('./funcTestRef')
var EventDriver = require('./eventDriver')
var appReference = new (require('../referenceSetup'))()
var driver

test.describe('Functional Test 1', function () {
  var testReference = new FuncTestRef('http://localhost:1337/')

  test.before(function () {
    this.timeout(50000)
  })

  test.after(function () {

  })

  test.beforeEach(function () {
  })

  test.afterEach(function () {

    // do something after test case execution is finished
    // no matter if there are failed cases

  })

  test.it('check buttons/statistics - one event', function () {
    var testedEvent = 'ScrumMasters1234'
    var testEventDriver = new EventDriver(testReference, appReference)
    this.timeout(100000)
    testEventDriver.addEvent(testedEvent).then(() => {
    	testEventDriver.openFeedbackPage(testedEvent).then(() => {
    		testEventDriver.clickSmiley(3).then(() => {
    			testEventDriver.getStatForEvent(testedEvent, 3).then((text) => {
    				var stat = text.split(' ', 1)
    				expect(parseInt(stat[0])).equals(1, 'counter not 1')
    				testEventDriver.quit()
    			}).catch(err => { console.log(err) })
    		}).catch(err => { console.log(err) })
    	}).catch(err => { console.log(err) })
    }).catch(err => { console.log(err) })
  })
})
