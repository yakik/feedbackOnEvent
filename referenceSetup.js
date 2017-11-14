class ReferenceSetup {
  get siteAddress () {
    return 'http://localhost:1337/'
  }

  get statisticsAddressPrefix () {
    return 'stat?event='
  }

  get feedbackAddressPrefix () {
    return 'feedback?event='
  }

  get numberOfFeedbackRungs () {
    return 5
  }

  get statElementIDPrefix () {
    return 'stat'
  }

  get buttonElementIDPrefix () {
    return 'button'
  }
}

module.exports = ReferenceSetup
