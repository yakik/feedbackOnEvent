var chai = require('chai')
chai.use(require('chai-as-promised'))
var expect = chai.expect
var assert = require('assert')

var referenceSetup = new (require('../referenceSetup'))()
var mongoConnectionString = referenceSetup.mongoConnectionString
var MongoClient = require('mongodb').MongoClient

MongoClient.connect(mongoConnectionString, function (err, db) {
  db.close()
})

var currentTest = 'TEST@' + (new Date()).getMilliseconds()

describe('My Inner Suite 1', function () {
  var driver

  before(function () {
  })

  after(function () {

  })

  beforeEach(function () {
  })

  afterEach(function () {

  })

  it('Test 1', function () {

  })

  it('Test 2', function () {

  })
})
