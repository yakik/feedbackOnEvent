var mocha = require('mocha')
var chai = require('chai')
chai.use(require('chai-as-promised'))
var expect = chai.expect
var assert = require('assert')

var referenceSetup = new (require('../referenceSetup'))()
var mongoConnectionString = referenceSetup.mongoConnectionString
var MongoClient = require('mongodb').MongoClient

function handlePromiseRejection(){}

MongoClient.connect(mongoConnectionString, function (err, db) {
  db.close()
})

/** ****************************************************** */

var FeedbackManager = require('../appModules/FeedbackManager.js')

var currentTest = 'TESTUT@' + (new Date()).getMilliseconds()

mocha.describe('FeedbackManager Tests', function () {
  var feedbackManager = new FeedbackManager()

  mocha.before(function () {

  })

  mocha.after(function () {

  })

  mocha.beforeEach(function () {
    feedbackManager.removeFeedback(currentTest).then(() => {
      feedbackManager.getFeedback(currentTest).then((feedback) => {
        expect(feedback).to.be.null('clearTests did not clear tests')
      },handlePromiseRejection)
    },handlePromiseRejection)
  })

  mocha.afterEach(function () {

  })

  mocha.it('Test 1', function () {

  })

  mocha.it('Test 2', function () {

  })
})
