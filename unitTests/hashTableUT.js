var mocha = require('mocha')
var chai = require('chai')
chai.use(require('chai-as-promised'))
var expect = chai.expect
var sinon = require('sinon')

mocha.describe('Hash Table Tests', function () {
  mocha.it('HashTable test 1', function () {
    var hashT = new HashTable()

    hashT.insert('Alex Hawkins', '510-599-1930')
    // hashT.retrieve();
    // [ , , , [ [ 'Alex Hawkins', '510-599-1930' ] ] ]
    hashT.insert('Boo Radley', '520-589-1970')
    // hashT.retrieve();
    // [ , [ [ 'Boo Radley', '520-589-1970' ] ], , [ [ 'Alex Hawkins', '510-599-1930' ] ] ]
    hashT.insert('Vance Carter', '120-589-1970').insert('Rick Mires', '520-589-1970').insert('Tom Bradey', '520-589-1970').insert('Biff Tanin', '520-589-1970')
    // hashT.retrieveAll();
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
    hashT.insert('Rick Mires', '650-589-1970').insert('Tom Bradey', '818-589-1970').insert('Biff Tanin', '987-589-1970')
    // hashT.retrieveAll();

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
    // hashT.retrieveAll();

    /*
 [ ,
   [ [ 'Boo Radley', '520-589-1970' ] ],
   ,
   [ [ 'Alex Hawkins', '510-599-1930' ] ],
   ,
   ,
   [ [ 'Biff Tanin', '987-589-1970' ] ] ]

 */
    hashT.insert('Dick Mires', '650-589-1970').insert('Lam James', '818-589-1970').insert('Ricky Ticky Tavi', '987-589-1970')
    hashT.retrieveAll()

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

 */
    console.log(hashT.retrieve('Lam James')) // 818-589-1970
    console.log(hashT.retrieve('Dick Mires')) // 650-589-1970
    console.log(hashT.retrieve('Ricky Ticky Tavi')) // 987-589-1970
    console.log(hashT.retrieve('Alex Hawkins')) // 510-599-1930
    console.log(hashT.retrieve('Lebron James')) // null
  })
})
