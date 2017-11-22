var mocha = require('mocha')
var chai = require('chai')
chai.use(require('chai-as-promised'))
var expect = chai.expect
var sinon = require('sinon')

/** ****************************************************** */

var Event = require('./Event.js')

var currentTestID = 'TESTUT@' + (new Date()).getMilliseconds()
var numberOfSmileys = 5

mocha.describe('event Tests', function () {
  mocha.it('Feedback Constructor Test', function () {
    var feedbackArray = new Array(numberOfSmileys)
    for (var i = 0; i < numberOfSmileys; i++) { feedbackArray[i] = ((i + 1) * 4) }

    var testEvent = new Event(currentTestID, numberOfSmileys, feedbackArray)
    expect(testEvent.ID).equals(currentTestID, 'testID not as expected')
    for (var i = 0; i < numberOfSmileys; i++) { expect(feedbackArray[i]).equals(testEvent.smileysFeedbackCountArray[i], 'Smiley feedbackCount not as expected (constructor)') }
  })

  mocha.it('event Constructor Test - no feedback array', function () {
    function forTest (testID, numSmileys, feedbacArr) {
      // will be called on purpose without the last parameter
      return new Event(testID, numSmileys, feedbacArr)
    }

    var testEvent = forTest(currentTestID, numberOfSmileys)
    expect(testEvent.ID).equals(currentTestID, 'testID not as expected')
    for (var i = 0; i < numberOfSmileys; i++) {
      expect(testEvent.smileysFeedbackCountArray[i]).equals(0, 'Smiley feedbackCount not zero as expected (constructor)')
      testEvent.smileysFeedbackCountArray[i]++
      expect(testEvent.smileysFeedbackCountArray[i]).equals(1, 'Smiley feedbackCount not one as expected (constructor)')
      
    }
  })

  mocha.it('test feedback count update', function () {
    var testEvent = new Event(currentTestID, numberOfSmileys)
    for (var i = 0; i < numberOfSmileys; i++) { expect(testEvent.smileysFeedbackCountArray[i]).equals(0, 'Smiley feedbackCount not 0 as expected') }
    var feedbackArray = new Array(numberOfSmileys)
    for (var i = 0; i < numberOfSmileys; i++) { feedbackArray[i] = ((i + 1) * 4) }
    testEvent.smileysFeedbackCountArray = feedbackArray

    for (var i = 0; i < numberOfSmileys; i++) { expect(feedbackArray[i]).equals(testEvent.smileysFeedbackCountArray[i], 'Smiley feedbackCount not as expected (update)') }
  })
})
