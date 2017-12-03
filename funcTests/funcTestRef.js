class FuncTestRef {
  constructor (baseURL) {
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
