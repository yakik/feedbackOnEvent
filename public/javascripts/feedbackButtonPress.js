function smileyButtonPress (eventID, smileyID) {
  var xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      document.getElementById('demo').innerHTML = this.responseText
    }
  }
  xhttp.open('POST', '/feedbackGiven/', true)
  xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  xhttp.send('eventID='+eventID+'&smileyID='+smileyID)
}
