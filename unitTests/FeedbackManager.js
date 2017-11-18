var mocha = require('mocha')
var chai = require('chai')
chai.use(require('chai-as-promised'))
var expect = chai.expect
var sinon = require('sinon')

var numberOfSmileys = 5

var currentTestID = 'TESTUT@' + (new Date()).getMilliseconds()

mocha.describe('Feedback Tests', function () {
  mocha.before(function () {
  })

  mocha.after(function () {
  })

  mocha.beforeEach(function () {
  })

  mocha.afterEach(function () {
  })

  mocha.it('get smileys count from a specific feedback'){
    var testFeedbackManager = new require('../appModules/FeedbackManager.js')
    var feedbackArray = new Array(numberOfSmileys)
    for (var i = 0; i < numberOfSmileys; i++)
      feedbackArray[i]= ((i + 1) * 4)
    testFeedbackManager.createFeedback(currentTestID,numberOfSmileys,feedbackArray)
    testSmileysFeedbackCountArray = testFeedbackManager.getSmileysFeedbackCountArray(currentTestID)
    for (var i=0;i<numberOfSmileys;i++)
      expect(testSmileysFeedbackCountArray[i]).equals(feedbackArray[i],'smileys count not the same')
  }

  mocha.it('add 1 to feedback count of smileys'){
    var testFeedbackManager = new require('../appModules/FeedbackManager.js')
    var feedbackArray = new Array(numberOfSmileys)
    for (var i = 0; i < numberOfSmileys; i++)
      feedbackArray[i]= 0
    testFeedbackManager.createFeedback(currentTestID,numberOfSmileys,feedbackArray)
    
    for (var i=0;  i < numberOfSmileys; i++)
      for (var j=0; j< (i+1)*3;j++)
        testFeedbackManager.addSmileyFeedback(currentTestID,i)
    
    feedbackArray = testFeedbackManager.getSmileysFeedbackCountArray(currentTestID)
    for (var i=0;  i < numberOfSmileys; i++)
      for (var j=0; j< (i+1)*3;j++)
        expect(feedbackArray[i]).equals((i+1)*3,'number of smiley feedbacks incorrect'

  }

})
