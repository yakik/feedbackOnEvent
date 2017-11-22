var mocha = require('mocha')
var chai = require('chai')
chai.use(require('chai-as-promised'))
var expect = chai.expect
var sinon = require('sinon')

var numberOfSmileys = 5

var currentTestID = 'TESTUT@' + (new Date()).getMilliseconds()
var EventManager = require('./eventManager.js')

mocha.describe('event Manager Tests', function () {
  mocha.it('test new event without event values', function () {
    var testEventManager = new EventManager()
    testEventManager.createEvent(currentTestID, numberOfSmileys)
    var testSmileysFeedbackCountArray = testEventManager.getSmileysFeedbackCountArray(currentTestID)
    for (var i = 0; i < numberOfSmileys; i++) {
      expect(testSmileysFeedbackCountArray[i]).to.be.a('number')
      expect(testSmileysFeedbackCountArray[i]).equals(0, 'smileys not 0 as expected')
      testSmileysFeedbackCountArray[i]++
      expect(testSmileysFeedbackCountArray[i]).equals(1, 'smileys not 1 as expected')
    }
  })

  mocha.it('get smileys count from a specific event', function () {
    var testEventManager = new EventManager()
    var feedback = new Array(numberOfSmileys)
    for (var i = 0; i < numberOfSmileys; i++) { feedback[i] = ((i + 1) * 4) }
    testEventManager.createEvent(currentTestID, numberOfSmileys,feedback)

    var testSmileysFeedbackCountArray = testEventManager.getSmileysFeedbackCountArray(currentTestID)
    for (var i = 0; i < numberOfSmileys; i++) { expect(testSmileysFeedbackCountArray[i]).equals(feedback[i], 'smileys count not the same') }
  })

  mocha.it('add 1 to event count of smileys', function () {
    var testEventManager = new EventManager()
    var feedback = new Array(numberOfSmileys)
    for (var i = 0; i < numberOfSmileys; i++) { feedback[i] = 0 }
    testEventManager.createEvent(currentTestID, numberOfSmileys,feedback)

    for (var i = 0; i < numberOfSmileys; i++) {
      for (var j = 0; j < (i + 1) * 3; j++) {
        testEventManager.addSmileyFeedback(currentTestID, i)
        feedback[i]++
      }
    }

    var feedbackFromEventManager = testEventManager.getSmileysFeedbackCountArray(currentTestID)

    for (var i = 0; i < numberOfSmileys; i++) {
      expect(feedback[i]).equals(feedbackFromEventManager[i], 'number of smiley events incorrect')
    }
  })
})
