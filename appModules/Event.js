console.log('Hi, I\'m EvenT!')

class Event {
  constructor (ID, Name, numberOfSmileys, smileysFeedbackCountArray) {
    this._ID = ID
    this._Name = Name
    this._numberOfSmileyTypes = numberOfSmileys
    if (typeof smileysFeedbackCountArray === 'undefined') {
      this._smileysFeedbackCountArray = new Array(numberOfSmileys)
      for (var i = 0; i < numberOfSmileys; i++)
        {this._smileysFeedbackCountArray[i] = 0}
    } else this._smileysFeedbackCountArray = smileysFeedbackCountArray.slice()
  }

  get ID () {
    return this._ID
  }

  get Name () {
    return this._Name
  }

  set smileysFeedbackCountArray (smileysFeedbackCountArray) {
    this._smileysFeedbackCountArray = smileysFeedbackCountArray.slice()
  }

  get smileysFeedbackCountArray () {
    return this._smileysFeedbackCountArray
  }
}

module.exports = Event
