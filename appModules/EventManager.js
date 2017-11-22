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

  createEvent (eventID, numberOfSmileys, feedbackArray) {
    var newEvent = new Event(eventID, numberOfSmileys, feedbackArray)
  
    this._eventHashTable.put(eventID, newEvent)
    return newEvent
  }

}

module.exports = EventManager
