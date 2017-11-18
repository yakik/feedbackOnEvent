class Feedback {
  constructor (ID, numberOfSmileys, smileysFeedbackCountArray) {
    this._ID = ID
    this._numberOfSmileyTypes = numberOfSmileys
    if (typeof smileysFeedbackCountArray === 'undefined') {
        this._smileysFeedbackCountArray = new Array(numberOfSmileys)
        for (var i = 0; i < numberOfSmileys; i++)
            this._smileysFeedbackCountArray[i] = 0
    }
    else this._smileysFeedbackCountArray = smileysFeedbackCountArray.slice()
  }

  get ID () {
    return this._ID
  }

  set smileysFeedbackCountArray (smileysFeedbackCountArray) {
    this._smileysFeedbackCountArray = smileysFeedbackCountArray.slice()
  }

  get smileysFeedbackCountArray () {
    return this._smileysFeedbackCountArray
  }
}

module.exports = Feedback
