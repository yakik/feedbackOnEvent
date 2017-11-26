class FuncTestRef {
  constructor (baseURL, numberOfSmileys) {
    this.baseURL = baseURL
  }

  getMainPageURL () {
    return this.baseURL
  }

  getFeedbackURL (eventID) {
    return this.baseURL + 'feedback/' + eventID
  }
}

module.exports = FuncTestRef
