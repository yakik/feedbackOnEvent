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
    testEventManager.createEvent(currentTestID, numberOfSmileys, feedback)

    var testSmileysFeedbackCountArray = testEventManager.getSmileysFeedbackCountArray(currentTestID)
    for (var i = 0; i < numberOfSmileys; i++) { expect(testSmileysFeedbackCountArray[i]).equals(feedback[i], 'smileys count not the same') }
  })

  mocha.it('test getting all events', function () {
    function compareEvents (a, b) {
      if (a[0] < b[0]) { return -1 }
      if (a[0] > b[0]) { return 1 }
      return 0
    }
    var testEventManager = new EventManager()
    var eventIDArray = []
    for (var i = 0; i < 20; i++) {
      testEventManager.createEvent('Event' + i, 5, [i, i + 1, i + 2, i + 3, i + 4])
      eventIDArray[i] = []
      eventIDArray[i][0] = 'Event' + i
      eventIDArray[i][1] = [i, i + 1, i + 2, i + 3, i + 4]
    }
    eventIDArray.sort(compareEvents)
    var allEvents = testEventManager.getAllEvents()
    for (i = 0; i < 20; i++) {
      expect(allEvents[i].ID).equals(eventIDArray[i][0], 'ID not the same')
      for (var j = 0; j < 5; j++) { expect(allEvents[i].smileysFeedbackCountArray[j]).equals(eventIDArray[i][1][j], 'feedback array ' + i + ' not equal') }
    }
  })

  mocha.it('add 1 to event count of smileys', function () {
    var testEventManager = new EventManager()
    var feedback = new Array(numberOfSmileys)
    for (var i = 0; i < numberOfSmileys; i++) { feedback[i] = 0 }
    testEventManager.createEvent(currentTestID, numberOfSmileys, feedback)

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
