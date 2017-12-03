var mocha = require('mocha')
var chai = require('chai')
chai.use(require('chai-as-promised'))
var expect = chai.expect
var sinon = require('sinon')

/** ****************************************************** */

var Event = require('./Event.js')

var currentTestName = 'TESTUT@' + (new Date()).getMilliseconds()
var currentTestID = '1'
var numberOfSmileys = 5

mocha.describe('event Tests', function () {
  mocha.it('Feedback Constructor Test', function () {
    var feedbackArray = new Array(numberOfSmileys)
    for (var i = 0; i < numberOfSmileys; i++) { feedbackArray[i] = ((i + 1) * 4) }

    var testEvent = new Event(currentTestID, currentTestName, numberOfSmileys, feedbackArray)
    expect(testEvent.ID).equals(currentTestID, 'testName not as expected')
    expect(testEvent.Name).equals(currentTestName, 'testName not as expected')
    for (var i = 0; i < numberOfSmileys; i++) { expect(feedbackArray[i]).equals(testEvent.smileysFeedbackCountArray[i], 'Smiley feedbackCount not as expected (constructor)') }
  })

  mocha.it('event Constructor Test - no feedback array', function () {
    function forTest (testID, testName, numSmileys, feedbacArr) {
      // will be called on purpose without the last parameter
      return new Event(testID, testName, numSmileys, feedbacArr)
    }

    var testEvent = forTest(currentTestID, currentTestName, numberOfSmileys)
    expect(testEvent.Name).equals(currentTestName, 'testName not as expected')
    expect(testEvent.ID).equals(currentTestID, 'testName not as expected')
    for (var i = 0; i < numberOfSmileys; i++) {
      expect(testEvent.smileysFeedbackCountArray[i]).equals(0, 'Smiley feedbackCount not zero as expected (constructor)')
      testEvent.smileysFeedbackCountArray[i]++
      expect(testEvent.smileysFeedbackCountArray[i]).equals(1, 'Smiley feedbackCount not one as expected (constructor)')
    }
  })

  mocha.it('test feedback count update', function () {
    var testEvent = new Event(currentTestID, currentTestName, numberOfSmileys)
    for (var i = 0; i < numberOfSmileys; i++) { expect(testEvent.smileysFeedbackCountArray[i]).equals(0, 'Smiley feedbackCount not 0 as expected') }
    var feedbackArray = new Array(numberOfSmileys)
    for (var i = 0; i < numberOfSmileys; i++) { feedbackArray[i] = ((i + 1) * 4) }
    testEvent.smileysFeedbackCountArray = feedbackArray

    for (var i = 0; i < numberOfSmileys; i++) { expect(feedbackArray[i]).equals(testEvent.smileysFeedbackCountArray[i], 'Smiley feedbackCount not as expected (update)') }
  })
})
