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

  clearPersistence (key, storage) {
    var me = this
    return new Promise(function (resolve, reject) {
      storage.removeItem(key).then(() => {
        me._eventHashTable.clearPersistence(key, storage).then(() => {
          resolve()
        }).catch(err => { reject(err) })
      }).catch(err => { reject(err) })
    })
  }

  persist (key, storage) {
    var me = this
    return new Promise(function (resolve, reject) {
      storage.setItem(key, {ID: me._ID, eventSequence: me._eventSequence}).then(() => {
        me._eventHashTable.persist(key, storage).then(() => {
          resolve()
        }).catch(err => { reject(err) })
      }).catch(err => { reject(err) })
    })
  }

  load (key, storage) {
    var me = this
    return new Promise(function (resolve, reject) {
      storage.getItem(key).then((persistedItems) => {
        if (persistedItems !== undefined) {
          me._ID = persistedItems.ID
          me._eventSequence = persistedItems.eventSequence
          me._limit = persistedItems.limit
          me._eventHashTable.load(key, storage).then(() => {
            resolve()
          }).catch(err => { reject(err) })
        } else {
          resolve()
        }
      }).catch(err => { reject(err) })
    })
  }

  getSmileysFeedbackCountArray (eventID) {
    return this._eventHashTable.get(eventID).smileysFeedbackCountArray
  }

  addSmileyFeedback (eventID, smileyID) {
    var eventToUpdate = this._eventHashTable.get(eventID)

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

  loadFromDB () {
    var allEventsJSON = EventManagerDBHandler.getAllEventManagerEvents(this._ID)
    for (var i = 0; i < allEventsJSON.length; i++) {
      this.createEvent(allEventsJSON[i].eventName,
        allEventsJSON[i].numberOfSmileys,
        allEventsJSON[i].feedbackArray)
    }
    return this.getAllEvents()
  }
}

module.exports = EventManager
