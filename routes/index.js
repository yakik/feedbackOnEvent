var express = require('express')
var router = express.Router()
var myApp=require('../app.js')

var referenceSetup = new (require('../referenceSetup'))()
var numberOfSmileyTypes = referenceSetup.numberOfSmileyTypes
var statElementIDPrefix = referenceSetup.statElementIDPrefix
var buttonElementIDPrefix = referenceSetup.buttonElementIDPrefix

var EventManager = require('../appModules/EventManager.js')
var eventManager = new EventManager()
const mongodb = require('mongodb');
let uri = 'mongodb://yaki:3zqUCWAJG1K0@ds159845.mlab.com:59845/feedbackagilesparks';
mongodb.MongoClient.connect(uri, function(err, client) {
  if(err) throw err;
    let db = client.db('feedbackagilesparks')
    let storage = db.collection('feedback');


  eventManager.load('ProdEventManager', storage).then(() => {
    console.log('load success')

    /* GET home page. */
    router.get('/feedback/:event', function (req, res, next) {
      res.render('feedback', { title: 'Feedback!',
        eventID: req.params.event,
        numberOfSmileys: eventManager.getSmileysFeedbackCountArray(req.params.event).length,
        buttonElementIDPrefix: buttonElementIDPrefix})
    })

    router.post('/removeEvent/', function (req, res, next) {
      res.send()
      eventManager.removeEvent(req.body.eventID)
      eventManager.persist('ProdEventManager', storage).then(() => {
        console.log('set success(feedback)')
      }).catch(err => { console.log(err) })
    })

    router.post('/feedbackGiven/', function (req, res, next) {
      // res.redirect('/thankYou/' + req.body.eventID)
      console.log('before')
      console.log(myApp.yaki)
      res.redirect('/')
      eventManager.addSmileyFeedback(req.body.eventID, req.body.smileyID)
      console.log('after')
      eventManager.persist('ProdEventManager', storage).then(() => {
        console.log('set success(feedback)')
      }).catch(err => { console.log(err) })
    })

    router.post('/addEvent', function (req, res, next) {
      res.redirect('/')
      eventManager.createEvent(req.body.NewEventName, req.body.NewEventNumberOfSmileys)
      eventManager.persist('ProdEventManager', storage).then(() => {
        console.log('set success')
      }).catch(err => { console.log(err) })
    })

    router.get('/', function (req, res, next) {
      res.render('main', {title: 'Agile Sparks Events', events: eventManager.getAllEvents()})
    })
  }).catch(err => { console.log(err) })
})

module.exports = router
