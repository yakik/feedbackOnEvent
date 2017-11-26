var Event = require('./Event.js')
var HashTable = require('./HashTable.js')

class EventManager {
  constructor () {
    this._eventHashTable = new HashTable()
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
          allEvents[k] = bucket[j][1]
          k++
        }
      }
    }
    allEvents.sort(compareEvents)
    return allEvents
  }

  createEvent (eventID, numberOfSmileys, feedbackArray) {
    var newEvent = new Event(eventID, numberOfSmileys, feedbackArray)

    this._eventHashTable.put(eventID, newEvent)
    return newEvent
  }
}

module.exports = EventManager
