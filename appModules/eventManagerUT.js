var mocha = require('mocha')
var chai = require('chai')
chai.use(require('chai-as-promised'))
var expect = chai.expect
var sinon = require('sinon')

var numberOfSmileys = 5

var currentTestName = 'TESTUT@' + (new Date()).getMilliseconds()

var EventManager = require('./eventManager.js')

mocha.describe('event Manager Tests', function () {
  mocha.it('test new event without event values', function () {
    var testEventManager = new EventManager()
    var currentTestID = testEventManager.createEvent(currentTestName, numberOfSmileys).ID

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
    var currentTestID = testEventManager.createEvent(currentTestName, numberOfSmileys, feedback).ID

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
    var eventNameArray = []
    for (var i = 0; i < 20; i++) {
      eventNameArray[i] = []
      eventNameArray[i][0] = testEventManager.createEvent('Event' + i, 5, [i, i + 1, i + 2, i + 3, i + 4]).ID
      eventNameArray[i][1] = 'Event' + i
      eventNameArray[i][2] = [i, i + 1, i + 2, i + 3, i + 4]
    }
    eventNameArray.sort(compareEvents)
    var allEvents = testEventManager.getAllEvents()
    for (i = 0; i < 20; i++) {
      expect(allEvents[i].ID).equals(eventNameArray[i][0], 'ID not the same')
      expect(allEvents[i].Name).equals(eventNameArray[i][1], 'Name not the same')
      for (var j = 0; j < 5; j++) { expect(allEvents[i].smileysFeedbackCountArray[j]).equals(eventNameArray[i][2][j], 'feedback array ' + i + ' not equal') }
    }
  })

  mocha.it('add 1 to event count of smileys', function () {
    var testEventManager = new EventManager()
    var feedback = new Array(numberOfSmileys)
    for (var i = 0; i < numberOfSmileys; i++) { feedback[i] = 0 }
    var currentTestID = testEventManager.createEvent(currentTestName, numberOfSmileys, feedback).ID

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

  mocha.it('test loading events (not integrated with DB', function () {
    var testEventManager = new EventManager()
    var testEventManager2 = new EventManager()
    for (var i = 0; i < 2; i++) {
      testEventManager2.createEvent('Event' + i, 5, [i, i + 1, i + 2, i + 3, i + 4])
    }

    // mock 2 events in DB
    testEventManager.loadFromDB()

    var allEvents = testEventManager.getAllEvents()
    var allEvents2 = testEventManager.getAllEvents()
    for (i = 0; i < 2; i++) {
      expect(allEvents[i].ID).equals(allEvents2[i].ID, 'ID not the same')
      expect(allEvents[i].Name).equals(allEvents2[i].Name, 'Name not the same')
      for (var j = 0; j < 5; j++) { expect(allEvents[i].smileysFeedbackCountArray[j]).equals(allEvents2[i].smileysFeedbackCountArray[j], 'feedback array ' + i + ' not equal') }
    }
  })
})
