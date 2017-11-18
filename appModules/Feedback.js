
class Feedback {
    
    constructor (ID) {
        this._ID = ID
   
        function insertDocument(db, callback) {
            db.collection('feedbacks').insertOne({
                "feedbackID" : this._ID
                },
                function(err, result) {
                    assert.equal(err, null);
                    console.log("Inserted a document into the feedback collection.");
                    callback();
                });
        };

  


  get ID () {
    return this._ID
  }

  set ID (ID) {
    this._ID = ID
  }

  save(db) {
    insertDocument(db, function() {
        db.close();
    });

  }
}

module.exports = Feedback
