var mocha = require('mocha')
var chai = require('chai')
chai.use(require('chai-as-promised'))
var expect = chai.expect
var sinon = require('sinon')

var numberOfSmileys = 5

var currentTestID = 'TESTUT@' + (new Date()).getMilliseconds()
var FeedbackManager = require('./FeedbackManager.js')

mocha.describe('Feedback Manager Tests', function () {
  mocha.it('test new feedback without feedback values', function () {
    var testFeedbackManager = new FeedbackManager()
    testFeedbackManager.createFeedback(currentTestID, numberOfSmileys)
    var testSmileysFeedbackCountArray = testFeedbackManager.getSmileysFeedbackCountArray(currentTestID)
    for (var i = 0; i < numberOfSmileys; i++) {
      expect(testSmileysFeedbackCountArray[i]).to.be.a('number')
      expect(testSmileysFeedbackCountArray[i]).equals(0, 'smileys not 0 as expected')
      testSmileysFeedbackCountArray[i]++
      expect(testSmileysFeedbackCountArray[i]).equals(1, 'smileys not 1 as expected')
    }
  })

  mocha.it('get smileys count from a specific feedback', function () {
    var testFeedbackManager = new FeedbackManager()
    var feedbackArray = new Array(numberOfSmileys)
    for (var i = 0; i < numberOfSmileys; i++) { feedbackArray[i] = ((i + 1) * 4) }
    testFeedbackManager.createFeedback(currentTestID, numberOfSmileys, feedbackArray)

    var testSmileysFeedbackCountArray = testFeedbackManager.getSmileysFeedbackCountArray(currentTestID)
    for (var i = 0; i < numberOfSmileys; i++) { expect(testSmileysFeedbackCountArray[i]).equals(feedbackArray[i], 'smileys count not the same') }
  })

  mocha.it('add 1 to feedback count of smileys', function () {
    var testFeedbackManager = new FeedbackManager()
    var feedbackArray = new Array(numberOfSmileys)
    for (var i = 0; i < numberOfSmileys; i++) { feedbackArray[i] = 0 }
    testFeedbackManager.createFeedback(currentTestID, numberOfSmileys, feedbackArray)

    for (var i = 0; i < numberOfSmileys; i++) {
      for (var j = 0; j < (i + 1) * 3; j++) {
        testFeedbackManager.addSmileyFeedback(currentTestID, i)
        feedbackArray[i]++
      }
    }

    var feedbackArrayFromFeedbackManager = testFeedbackManager.getSmileysFeedbackCountArray(currentTestID)

    for (var i = 0; i < numberOfSmileys; i++) {
      expect(feedbackArray[i]).equals(feedbackArrayFromFeedbackManager[i], 'number of smiley feedbacks incorrect')
    }
  })
})
