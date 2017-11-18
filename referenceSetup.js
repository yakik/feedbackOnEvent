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

  get numberOfSmileyTypes () {
    return 5
  }

  get statElementIDPrefix () {
    return 'stat'
  }

  get buttonElementIDPrefix () {
    return 'button'
  }

  get mongoConnectionString () {
   // return 'mongodb://yaki:3zqUCWAJG1K0@ds159845.mlab.com:59845/feedbackagilesparks'
   return 'mongodb://yaki:y4a43kSi@cluster0-shard-00-00-aadyb.mongodb.net:27017,cluster0-shard-00-01-aadyb.mongodb.net:27017,cluster0-shard-00-02-aadyb.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'
  }
}

module.exports = ReferenceSetup
