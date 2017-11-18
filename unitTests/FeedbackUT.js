var mocha = require('mocha')
var chai = require('chai')
chai.use(require('chai-as-promised'))
var expect = chai.expect
var sinon = require('sinon')

  function handlePromiseRejection () {
    // throw 'THEN ERROR'
  }

/** ****************************************************** */

var Feedback = require('../appModules/Feedback.js')

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

  mocha.it('Create new Feedback', function () {
    var testFeedback = new Feedback(currentTestID)
    expect(testFeedback.ID).equals(currentTestID, 'testID not as expected')
  })

  mocha.it('save Feedback to mongo', function () {
    var testFeedback = new Feedback(currentTestID)
    testFeedback.save(MongoClient)
  })
})
