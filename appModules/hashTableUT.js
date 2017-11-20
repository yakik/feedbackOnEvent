var mocha = require('mocha')
var chai = require('chai')
chai.use(require('chai-as-promised'))
var expect = chai.expect
var sinon = require('sinon')

var HashTable = require('./HashTable.js')

mocha.describe('Hash Table Tests', function () {
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
    console.log(hashT.get('Lebron James')) // null*/
  })
})
