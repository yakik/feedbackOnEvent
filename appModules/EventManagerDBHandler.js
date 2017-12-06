
class EventManagerDBHandler {
  constructor () {
    var referenceSetup = new (require('../referenceSetup'))()
    var mongoConnectionString = referenceSetup.mongoConnectionString
    var mp = require('mongodb-promise')

    mp.MongoClient.connect(mongoConnectionString)
      .then((db) => {
        db.close().then(console.log('connected to DB'))
      }, (err) => { console.log(err) })
  }

  insertDocument (db, callback) {
    db.collection('feedbacks').insertOne({
      'feedbackID': this._ID
    },
    function (err, result) {
      assert.equal(err, null)
      console.log('Inserted a document into the feedback collection.')
      callback()
    })
  };

  getDocument (collection, key) {
    return this._ID
  }

  set ID (ID) {
    this._ID = ID
  }

  save (db) {
    insertDocument(db, function () {
      db.close()
    })
  }
}

module.exports = EventManagerDBHandler
