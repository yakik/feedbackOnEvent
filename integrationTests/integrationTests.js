var mocha = require('mocha')
var chai = require('chai')
chai.use(require('chai-as-promised'))
var expect = chai.expect
var assert = require('assert')
var sinon = require('sinon')

var referenceSetup = new (require('../referenceSetup'))()
var mongoConnectionString = referenceSetup.mongoConnectionString
var MongoClient = require('mongodb').MongoClient

function handlePromiseRejection () {
  // throw 'THEN ERROR'
}

MongoClient.connect(mongoConnectionString, function (err, db) {
  db.close()
})

/** ****************************************************** */

var FeedbackManager = require('../appModules/FeedbackManager.js')

var currentTest = 'TESTUT@' + (new Date()).getMilliseconds()

mocha.describe('FeedbackManager Tests', function () {
  var feedbackManager = new FeedbackManager(MongoClient)

  mocha.before(function () {

  })

  mocha.after(function () {

  })

  mocha.beforeEach(function () {

  })

  mocha.afterEach(function () {

  })

  mocha.it('Create new Feedback', function () {
    
      })

  /*mocha.it('Remove - Get - Add - Get', function () {
    feedbackManager.removeFeedback(currentTest).then(() => {
      feedbackManager.getFeedback(currentTest).then((feedback) => {
        expect(feedback).to.be.null('clearTests did not clear tests')
        feedbackManager.createFeedback(currentTest).then((feedback) => {
          expect(feedback.ID).to.be(currentTest, 'new feedback ID not as created')
          feedbackManager.getFeedback(currentTest).then((feedback) => {
            expect(feedback.ID).to.be(currentTest, 'new feedback got from DB ID not as created')
            feedbackManager.removeFeedback(currentTest).then(() => {
              expect(feedback).to.be.null('clearTests did not clear tests')
            }, handlePromiseRejection)
          }, handlePromiseRejection)
        }, handlePromiseRejection)
      }, handlePromiseRejection)
    }, handlePromiseRejection)
  })*/


})
