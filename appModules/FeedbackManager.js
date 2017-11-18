var Feedback = require('./Feedback.js')

class FeedbackManager {
  constructor (mongoClient) {
    this.mongoClient = mongoClient
  }

  removeFeedback (feedbackID) {
    return new Promise(function (fulfill, reject) {
      fulfill()
    })
  }

  getFeedback (feedbackID) {
    return new Promise(function (fulfill, reject) {
      fulfill(new Feedback())
    })
  }

  createFeedback (feedbackID) {
    return new Promise(function (fulfill, reject) {
      fulfill(new Feedback())
    })
  }
}

module.exports = FeedbackManager
