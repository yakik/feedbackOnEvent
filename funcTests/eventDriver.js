var selenium = require('selenium-webdriver')

class EventDriver {
  constructor (driver, testReference, numberOfSmileys, appReference) {
    this.driver = driver
    this.numberOfSmileys = numberOfSmileys
    this.testReference = testReference
    this.appReference = appReference
  }

  setTextField (textFieldID, textFieldNewValue) // Only visible inside Restaurant()
  {
    return this.driver.executeScript('document.getElementById(\''+
      textFieldID+
      '\').setAttribute(\'value\', \''+
      textFieldNewValue+
      '\')')
  }

  clickButton (buttonID) {
    this.driver.findElement(selenium.By.id(buttonID))
      .then(button => {
        return button.click()
      })
  }

  addEvent (eventName) {
    this.driver.get(this.testReference.getMainPageURL())
      .then(() => {
        this.setTextField(this.appReference.newEventNameInputID, eventName).then(() => {
          this.setTextField(this.appReference.newEventNameNumberOfSmileysInputID, this.numberOfSmileys).then(() => {
            return this.clickButton(this.appReference.newEventButtonID)
          })
        })
      }).catch(err => { console.log(err) })
  }

  clickFeedbackButton (smileyID) {

  }

  getFeedback () {
  }
}
module.exports = EventDriver
