var referenceSetup = new (require('../referenceSetup'))()
var mongoConnectionString = referenceSetup.mongoConnectionString
var mp = require('mongodb-promise')

mp.MongoClient.connect(mongoConnectionString)
  .then((db) => {
    db.close().then(console.log('connected to DB'))
  }, (err) => { console.log(err) })