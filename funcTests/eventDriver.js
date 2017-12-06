var selenium = require('selenium-webdriver')
var Promise = require('Promise')

class EventDriver {
  constructor (testReference, appReference) {
    this.testReference = testReference
    this.appReference = appReference
    this.driver = new selenium.Builder().forBrowser('chrome').build()
  }

  quit () {
    this.driver.quit()
  }

  setTextField (textFieldID, textFieldNewValue) {
    var me = this
    return new Promise(function (resolve, reject) {
      me.driver.findElement(selenium.By.id(textFieldID))
        .then((element) => {
          element.sendKeys(textFieldNewValue).then(() => {
            resolve(element)
          }).catch((err) => { reject(err) })
        }).catch((err) => { reject(err) })
    })
  }

  addEvent (eventName) {
    var me = this
    return new Promise(function (resolve, reject) {
      me.driver.get(me.testReference.getMainPageURL())
        .then(() => {
          me.setTextField(me.appReference.newEventNameInputID, eventName).then((element) => {
            element.submit().then(() => {
              resolve()
            }).catch(err => { reject(err) })
          }).catch(err => { reject(err) })
        }).catch(err => { reject(err) })
    })
  }

  clickSmiley (smileyID) {
    var me = this
    return new Promise(function (resolve, reject) {
      me.driver.findElement(selenium.By.id('button' + smileyID)).then(element => {
        element.click().then(() => {
          resolve()
        }).catch((err) => { reject(err) })
      }).catch(err => { reject(err) })
    })
  }

  getEventIDOnStatPage (eventName) {
  // assumes we are on the main page
    var me = this
    return new Promise(function (resolve, reject) {
    // a(href='/feedback/' + events[i].ID id='eventID:'+events[i].ID+'Href')
      me.driver.findElement(selenium.By.id('eventIDofEventName:' + eventName)).then(element => {
        element.getAttribute('value').then((eventID) => {
          resolve(eventID)
        }).catch(err => { reject(err) })
      }).catch(err => { reject(err) })
    })
  }

  openFeedbackPage (eventName) {
    var me = this
    return new Promise(function (resolve, reject) {
      // a(href='/feedback/' + events[i].ID id='eventID:'+events[i].ID+'Href')
      me.getEventIDOnStatPage(eventName).then((eventID) => {
        me.driver.get(me.testReference.getFeedbackURL(eventID))
          .then(() => {
            resolve()
          }).catch(err => { reject(err) })
      }).catch(err => { reject(err) })
    })
  }

  getStatForEvent (eventName, smileyID) {
    var me = this
    return new Promise(function (resolve, reject) {
      me.driver.get(me.testReference.getMainPageURL())
        .then(() => {
          me.getEventIDOnStatPage(eventName).then((eventID) => {
            me.driver.findElement(selenium.By.id('eventID:' + eventID + 'Stat:' + smileyID)).then(element => {
              element.getText().then((text) => {
                resolve(text)
              }).catch(err => { reject(err) })
            }).catch(err => { reject(err) })
          }).catch(err => { reject(err) })
        }).catch(err => { reject(err) })
    })
  }
}

module.exports = EventDriver
