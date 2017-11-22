var Feedback = require('./Feedback.js')
var HashTable = require('./HashTable.js')

class FeedbackManager {
  constructor () {
    this._feedbackHashTable = new HashTable()

  }

  getSmileysFeedbackCountArray (feedbackID) {
    return this._feedbackHashTable.get(feedbackID).smileysFeedbackCountArray
  }

  addSmileyFeedback (feedbackID, smileyID) {
    var feedbackToUpdate = this._feedbackHashTable.get(feedbackID)
  
    feedbackToUpdate.smileysFeedbackCountArray[smileyID]++

    this._feedbackHashTable.put(feedbackID, feedbackToUpdate)

  }

  createFeedback (feedbackID, numberOfSmileys, feedbackArray) {
    var newFeedback = new Feedback(feedbackID, numberOfSmileys, feedbackArray)
  
    this._feedbackHashTable.put(feedbackID, newFeedback)
    return newFeedback
  }

}

module.exports = FeedbackManager
