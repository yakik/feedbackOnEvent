var mocha = require('mocha')
var chai = require('chai')
chai.use(require('chai-as-promised'))
var expect = chai.expect
var sinon = require('sinon')


/** ****************************************************** */

var Feedback = require('./Feedback.js')

var currentTestID = 'TESTUT@' + (new Date()).getMilliseconds()
var numberOfSmileys = 5

mocha.describe('Feedback Tests', function () {
 
  mocha.it('Feedback Constructor Test', function () {
    var feedbackArray = new Array(numberOfSmileys)
    for (var i = 0; i < numberOfSmileys; i++)
      feedbackArray[i]= ((i + 1) * 4)
    
    var testFeedback = new Feedback(currentTestID, numberOfSmileys, feedbackArray)
    expect(testFeedback.ID).equals(currentTestID, 'testID not as expected')
    for (var i = 0; i < numberOfSmileys; i++)
      expect(feedbackArray[i]).equals(testFeedback.smileysFeedbackCountArray[i],'Smiley feedbackCount not as expected (constructor)')
  })

  mocha.it('test feedback count update', function () {
    var testFeedback = new Feedback(currentTestID, numberOfSmileys )
    for (var i = 0; i < numberOfSmileys; i++)
      expect(testFeedback.smileysFeedbackCountArray[i]).equals(0,'Smiley feedbackCount not 0 as expected')
    var feedbackArray = new Array(numberOfSmileys)
    for (var i = 0; i < numberOfSmileys; i++)
      feedbackArray[i]= ((i + 1) * 4)
    testFeedback.smileysFeedbackCountArray = feedbackArray

    for (var i = 0; i < numberOfSmileys; i++)
      expect(feedbackArray[i]).equals(testFeedback.smileysFeedbackCountArray[i],'Smiley feedbackCount not as expected (update)')
  })
})
