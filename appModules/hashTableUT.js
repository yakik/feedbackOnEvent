var mocha = require('mocha')
var chai = require('chai')
chai.use(require('chai-as-promised'))
var expect = chai.expect
var sinon = require('sinon')

var HashTable = require('./HashTable.js')

mocha.describe('Hash Table Tests MONGO', function () {
  mocha.it('test hash table persistence', (done) => {
    const mongodb = require('mongodb');
    let uri = 'mongodb://yaki:3zqUCWAJG1K0@ds159845.mlab.com:59845/feedbackagilesparks';
    mongodb.MongoClient.connect(uri, function(err, client) {
      if(err) throw err;
      let db = client.db('feedbackagilesparks')
        let storage = db.collection('feedback');
         var hashT = new HashTable()
      // clear previous tests
      hashT.clearPersistenceMONGO('UTHash', storage).then(() => {
        for (var i = 0; i < 5; i++) {
          hashT.put(i, 'item number ' + i)
        }

        hashT.persistMONGO('UTHash', storage).then(() => {
        // clear the hash
          for (var i = 0; i < 5; i++) {
            hashT.remove(i)
          }
          expect(hashT.count).equals(0, 'hash not empty')
          hashT.loadmONGO('UTHash', storage).then(() => {
            expect(hashT.count).equals(5, 'number of items in hash not as expected')
            for (var i = 0; i < 5; i++) {
              expect(hashT.get(i)).equals('item number ' + i, 'hash item not as expected')
            }
            done()
          }).catch(err => { console.log(err) })
        }).catch(err => { console.log(err) })
      }).catch(err => { console.log(err) })
    }).catch(err => { console.log(err) })
  })



mocha.describe('Hash Table Tests', function () {
  mocha.it('test hash table persistence', (done) => {
    var storage = require('node-persist')
    storage.init().then(() => {
      var hashT = new HashTable()
      // clear previous tests
      hashT.clearPersistence('UTHash', storage).then(() => {
        for (var i = 0; i < 5; i++) {
          hashT.put(i, 'item number ' + i)
        }

        hashT.persist('UTHash', storage).then(() => {
        // clear the hash
          for (var i = 0; i < 5; i++) {
            hashT.remove(i)
          }
          expect(hashT.count).equals(0, 'hash not empty')
          hashT.load('UTHash', storage).then(() => {
            expect(hashT.count).equals(5, 'number of items in hash not as expected')
            for (var i = 0; i < 5; i++) {
              expect(hashT.get(i)).equals('item number ' + i, 'hash item not as expected')
            }
            done()
          }).catch(err => { console.log(err) })
        }).catch(err => { console.log(err) })
      }).catch(err => { console.log(err) })
    }).catch(err => { console.log(err) })
  })

  mocha.it('HashTable test 1', function () {
    var hashT = new HashTable()

    hashT.put('Alex Hawkins', '510-599-1930')
    // hashT.get();
    // [ , , , [ [ 'Alex Hawkins', '510-599-1930' ] ] ]
    hashT.put('Boo Radley', '520-589-1970')
    // hashT.get();
    // [ , [ [ 'Boo Radley', '520-589-1970' ] ], , [ [ 'Alex Hawkins', '510-599-1930' ] ] ]
    hashT.put('Vance Carter', '120-589-1970').put('Rick Mires', '520-589-1970').put('Tom Bradey', '520-589-1970').put('Biff Tanin', '520-589-1970')
    // hashT.getAll();
    /*
 [ ,
   [ [ 'Boo Radley', '520-589-1970' ],
     [ 'Tom Bradey', '520-589-1970' ] ],
   ,
   [ [ 'Alex Hawkins', '510-599-1930' ],
     [ 'Rick Mires', '520-589-1970' ] ],
   ,
   ,
   [ [ 'Biff Tanin', '520-589-1970' ] ] ]
 */

    // overide example (Phone Number Change)
    //
    hashT.put('Rick Mires', '650-589-1970').put('Tom Bradey', '818-589-1970').put('Biff Tanin', '987-589-1970')
    // hashT.getAll();

    /*
 [ ,
   [ [ 'Boo Radley', '520-589-1970' ],
     [ 'Tom Bradey', '818-589-1970' ] ],
   ,
   [ [ 'Alex Hawkins', '510-599-1930' ],
     [ 'Rick Mires', '650-589-1970' ] ],
   ,
   ,
   [ [ 'Biff Tanin', '987-589-1970' ] ] ]

 */

    hashT.remove('Rick Mires')
    hashT.remove('Tom Bradey')
    // hashT.getAll();

    /*
 [ ,
   [ [ 'Boo Radley', '520-589-1970' ] ],
   ,
   [ [ 'Alex Hawkins', '510-599-1930' ] ],
   ,
   ,
   [ [ 'Biff Tanin', '987-589-1970' ] ] ]

 */
    hashT.put('Dick Mires', '650-589-1970').put('Lam James', '818-589-1970').put('Ricky Ticky Tavi', '987-589-1970')
    hashT.getAll()

    /* NOTICE HOW HASH TABLE HAS NOW DOUBLED IN SIZE UPON REACHING 75% CAPACITY ie 6/8. It is now size 16.
  [,
   ,
   [ [ 'Vance Carter', '120-589-1970' ] ],
   [ [ 'Alex Hawkins', '510-599-1930' ],
     [ 'Dick Mires', '650-589-1970' ],
     [ 'Lam James', '818-589-1970' ] ],
   ,
   ,
   ,
   ,
   ,
   [ [ 'Boo Radley', '520-589-1970' ],
     [ 'Ricky Ticky Tavi', '987-589-1970' ] ],
   ,
   ,
   ,
   ,
   [ [ 'Biff Tanin', '987-589-1970' ] ] ]

    console.log(hashT.get('Lam James')) // 818-589-1970
    console.log(hashT.get('Dick Mires')) // 650-589-1970
    console.log(hashT.get('Ricky Ticky Tavi')) // 987-589-1970
    console.log(hashT.get('Alex Hawkins')) // 510-599-1930
    console.log(hashT.get('Lebron James')) // null */
  })
})
