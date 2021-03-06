var Event = require('./Event.js')
var HashTable = require('./HashTable.js')
var EventManagerDBHandler = require('./EventManagerDBHandler')

class EventManager {
  constructor (eventManagerID) {
    this._eventHashTable = new HashTable()
    this._eventSequence = 1
    if (eventManagerID === undefined) {
      this._ID = 'Prod'
    } else {
      this._ID = eventManagerID
    }
  }

  get count () {
    return this._eventHashTable.count
  }

  
  persist (key, storage) {
    var me = this
    return new Promise(function (resolve, reject) {
      storage.updateOne(
        { key:{ $eq: key } },
        {key: key, ID: me._ID, eventSequence: me._eventSequence},
        { upsert: true },function(err,res){
            me._eventHashTable.persist(key+'Hash', storage).then(() => {
          resolve()
        }).catch(err => { reject(err) })
      })//.catch(err => { reject(err) })
    })
  }

  clearPersistence (key, storage) {
    var me = this
    return new Promise(function (resolve, reject) {
      storage.remove( { key: { $eq: key } } ,function(err,obj) {
        if (err) throw err
        me._eventHashTable.clearPersistence(key+'Hash', storage).then(() => {
          resolve()
        }).catch(err => { reject(err) })
      })//.catch(err => { reject(err) })
    })
  }

  load (key, storage) {
    var me = this
    return new Promise(function (resolve, reject) {
      storage.findOne({ key : { $eq: key } }, function(err, persistedItems) {
        if (err) throw err;
        if (persistedItems==null){
          constructor()
          resolve()
        } else {
        if ((persistedItems !== undefined)
          &&(persistedItems.eventSequence === parseInt(persistedItems.eventSequence, 10))) {
          me._ID = persistedItems.ID
          me._eventSequence = parseInt(persistedItems.eventSequence)
          me._eventHashTable.load(key+'Hash', storage).then(() => {
            resolve()
          }).catch(err => { reject(err) })
        } else {
          resolve()
        }}
      })//.catch(err => { reject(err) })
    })
  }


  

  getEvent (eventID) {
    var fromHash = this._eventHashTable.get(eventID)
    return new Event(fromHash._ID
      , fromHash._Name
      , fromHash._numberOfSmileys
      , fromHash._smileysFeedbackCountArray)
  }

  getSmileysFeedbackCountArray (eventID) {
    return this.getEvent(eventID).smileysFeedbackCountArray
  }

  addSmileyFeedback (eventID, smileyID) {
    var eventToUpdate = this.getEvent(eventID)

    eventToUpdate.smileysFeedbackCountArray[smileyID]++

    this._eventHashTable.put(eventID, eventToUpdate)
  }

  getAllEvents () {
    function compareEvents (a, b) {
      if (a.ID < b.ID) { return -1 }
      if (a.ID > b.ID) { return 1 }
      return 0
    }
    var allEvents = new Array(this._eventHashTable._count)
    var k = 0
    for (var i = 0; i < this._eventHashTable._limit; i++) {
      var bucket = this._eventHashTable._storage[i]

      if (bucket) {
        for (var j = 0; j < bucket.length; j++) {
          allEvents[k] = new Event(bucket[j][1]._ID
            , bucket[j][1]._Name
            , bucket[j][1]._numberOfSmileys
            , bucket[j][1]._smileysFeedbackCountArray)
          k++
        }
      }
    }
    allEvents.sort(compareEvents)
    return allEvents
  }

  createEvent (eventName, numberOfSmileys, feedbackArray) {
    var newEvent = new Event((this._eventSequence++).toString(), eventName, numberOfSmileys, feedbackArray)

    this._eventHashTable.put(newEvent.ID, newEvent)
    return newEvent
  }

  removeEvent (eventID) {
    this._eventHashTable.remove(eventID)
  }
}

module.exports = EventManager
