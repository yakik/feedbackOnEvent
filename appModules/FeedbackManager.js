var Feedback = require('./Feedback.js')

class FeedbackManager {
  constructor (numberOfSmileys) {
    this._numberOfSmileys = numberOfSmileys
    var HashTable = require('hashtable')
    this._feedbackHashTable = new HashTable()
  }

  getSmileysFeedbackCountArray (feedbackID) {
    var feedbackArray = new Array(this._numberOfSmileys)
    for (var i = 0; i < this._numberOfSmileys; i++) { feedbackArray[i] = 0 }
    return feedbackArray
  }

  addSmileyFeedback (feedbackID, smileyID) {
    var feedback = this._feedbackHashTable.get(feedbackID)
    feedback.smileysFeedbackCountArray[smilyID]++
  }

  createFeedback (feedbackID) {
    newFeedback = new Feedback(feedbackID, this._numberOfSmileys)
    this._feedbackHashTable.put(feedbackID, newFeedback)
  }
}

module.exports = FeedbackManager
