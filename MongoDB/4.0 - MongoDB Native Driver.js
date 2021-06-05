
//  Reference: https://docs.mongodb.com/drivers/node/current/

//  ==================================
//  🚙 4.0 - MongoDB Native Driver🚗
//  ==================================
//
//  We learnt on how to use MongoDB through shells. Even though it is more technical than using GUI like MongoDB Compass,
//  it still doesn't help us in manipulating the database through our javascript!
//
//  There is a official MongoDB driver for NodeJS, called "MongoDB NodeJS Driver". Install it through npm first
//
//      npm i mongodb
//
//  This official MongoDB Node.js driver allows Node.js applications to connect to MongoDB and work with data. The driver
//  features an asynchronous API which allows you to interact with MongoDB using Promises, or traditional callbacks
//  Due to this, most operations can be done in either callback fashion, or promises fashion.
//  
//  In this note however, I will do most of operations in callback fashion


// =============================
//  🌐 4.1 - Connecting to DB
// =============================
//
// To connect to our database, we have to do it through a MongoClient. The MongoClient represents a user of the database and
// will have information regarding the URI of the MongoDB it has to connect to
//
// As mentioned, since database operations are asynchronous, there are 2 ways of doing things:
//      >   Callbacks
//      >   Promises / async await

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const uri = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


async function connect_to_db_example() {
    try {
        //  Connect client to the server
        await client.connect();

        //  Establish and verify the connection
        await client.db("admin").command({ ping: 1 });
        console.log("\nConnected successfully to local MongoDB server!\n");
    } finally {
        //  Close the client connection when the connection is no longer used
        await client.close();
    }
}


function example4_1() {
    //  Using Promises syntax
    connect_to_db_example()
    .catch( console.dir );
}


//======================================================
// 📄 4.2 - Creating Database and Collections 📄
//======================================================
//
// In MongoDB, a database is not created until:
//      >   The database has at least one collection
//      >   The collection has at least one document
//
// To create a database, it turns out we just have to specify the db name
// inside the URI, like
//
//      mongodb://127.0.0.1:27017/theDBName
//
// or perhaps we can do it explicitly inside the code, as we'll see in example code later
//
// 
// MongoDB is very smart. If we trying to insert documents in non-existing collections, it will automatically
// create one for us!
// To create a collection explicitly, use createCollection( name ) method, which also has two variations:
// callback and promises
//
// To drop a collection, select the collection and invoke the drop() method on it.

async function createDatabaseCollectionExample() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("\nConnected successfully to local MongoDB server!\n");

        const nativeDriverExampleDB = client.db('native_driver_example');
        await nativeDriverExampleDB.createCollection('example_collection');
        console.log('\nSuccessfully created collection in the native_driver_example database!\n');

        await nativeDriverExampleDB.collection('example_collection').drop();
        console.log('\nSuccessfully dropped the collection in the native_driver_example database!\n')

    } finally {
        client.close();
    }
}

function example4_2() {
    createDatabaseCollectionExample()
    .catch( console.dir );
}




//=======================================================================
//  In the following examples, we will work on database native_driver_example,
//  and always be using the collections 'example_users'
//  Ensure the setup has been done to ensure no errors
//=======================================================================
function setup() {
    client.connect()
    .then((db) => {
        const nativeDriverExampleDB = db.db('native_driver_example');
        return nativeDriverExampleDB.createCollection('example_users');
    })
    .then((res) => {
        console.log("\nSuccessfully created colections 'example_users' in native_driver_example database");
    })
    .catch(console.dir)
    .finally(()=> {
        client.close();
    });
}



//==================================================
//  CRUD - C for Create
// 📝 4.3 - Inserting Documents into Collections 📝
//==================================================
//
// To insert some documents (entry) into a collection of a database, we can do the following:
//      > insertOne( document )
//      > insertMany( [ documents...] )
//  
// If you do not set explicitly the _id field, by default MongoDB will always attach a _id
// field to each of the documents.
// If you do specify _id explicitly, ensure that the inserted documents always have a unique _id
// value
//
// Through insertOne() or insertMany(), it will return a result object, which may look like the following:
// {
//      result: { ok: 1, n: 14 },
//      ops: [
//          ...insertedDocuments with _id
//      ],
//      insertedCount: 14,
//      insertedIds: [
//          ...insertedDocuments' _id
//      ]
// }

async function insertDocumentsExample() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("\nConnected successfully to local MongoDB server!\n");

        const nativeDriverExampleDB = client.db('native_driver_example');
        const exampleUsersCollections = nativeDriverExampleDB.collection('example_users');

        //  Insert one
        let res = await exampleUsersCollections.insertOne({
            name: 'John',
            address: 'Highway 71'
        });
        console.log("\nOne document inserted: \n" + res);

        //  Insert Many
        res = await exampleUsersCollections.insertMany([
            { name: 'Peter', address: 'Lowstreet 4'},
            { name: 'Amy', address: 'Apple st 652'},
            { name: 'Hannah', address: 'Mountain 21'},
            { name: 'Michael', address: 'Valley 345'},
            { name: 'Sandy', address: 'Ocean blvd 2'},
            { name: 'Betty', address: 'Green Grass 1'},
            { name: 'Richard', address: 'Sky st 331'},
            { name: 'Susan', address: 'One way 98'},
            { name: 'Vicky', address: 'Yellow Garden 2'},
            { name: 'Ben', address: 'Park Lane 38'},
            { name: 'William', address: 'Central st 954'},
            { name: 'Chuck', address: 'Main Road 989'},
            { name: 'Viola', address: 'Sideway 1633'}
        ]);
        console.dir(`${res.insertedCount} documents inserted`);
    } finally {
        client.close();
    }
}

function example4_3() {
    insertDocumentsExample()
    .catch(console.dir);
}




//==================================
//  CRUD - R for Read
// 🔎 4.4 - Find Data (No Query) 🔎
//==================================
//
// To perform a search on the database, we could use the findOne() method to limit to first match,  or find() for all matches
//
// The first parameter is an query object, which allows us to filter out documents that we don't want
// The second parameter is an optional projection object, which lets us select which fields to include in the result.
//
// For example, if we put query object as an empty object, the search will match everything and potentially
// return every documents in the collections.
// 
//      find({})                <<- Matches every document in the collections, returning a Cursor reference
//      findOne({})             <<- Matches and return the first document
//
// In find() method, it returns Cursor method. We could use forEach() or toArray() to get access to our data
//  
// In the projection object, we use 0 to exclude fields, and 1 to include fields. 
// Note that we cannot have both 0 and 1 in the same object! If you set some fields to 1, all other unmentioned fields are implied to
// be 0, and vice versa! (Exception is _id, which is allowed to have different value of 0 and 1)
// (Projection can also be done via project() method!)
//
//      find({}, { projection: {name: 1}} )         <<- only name field is present.
//      find({}, { projection: {_id: 0}} )          <<- excludes the _id field

async function findDocumentExample() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("\nConnected successfully to local MongoDB server!\n");

        const nativeDriverExampleDB = client.db('native_driver_example');
        const exampleUsersCollections = nativeDriverExampleDB.collection('example_users');

        //  Find first document in the collections
        console.log("This is the First Document in " + exampleUsersCollections.namespace);
        console.dir( await exampleUsersCollections.findOne({}) );

        //  Find all names in the collection
        console.log("\nThis is the list of names in " + exampleUsersCollections.namespace);
        console.dir( await exampleUsersCollections.find({}, {
            projection: { _id: 0, name: 1 }
        }).toArray() );
    } finally {
        client.close();
    }
}

function example4_4() {
    findDocumentExample()
    .catch(console.dir);
}





//====================================
//  CRUD - R for Read
// 🔎 4.5 - Query Data and Sorting 🔎
//====================================
//
// Simply returning documents is not enough. Database is great for looking up data instead of having it returning all data
// and filter on server side! (Bad idea)
//
// The first parameter for find() and findOne() is query object, which lets us narrow down our searches to something we want.
//
// Let's start with exact matching string:
//
//      find({
//          name: "Logan"
//      })
//
//  Or even better, we can use regular expressions on searching for string!
//
//      find({
//          name: /^Logan/  
//      })
//
//  Instead, we might want to use more complex operators, like greater than, less than etc. There are the following operators:
//      >   Comparison Operators
//      >   Logical Operators
//      >   Element Operators
//      >   Evaluation Operators
//
//  Not going to cover them all, you can look it up at official documentation website.
//  Here are some common ones: ($gt, $lt, $ne), ($or, $not), ($exists)
//
//      find({
//          age: { $ge: 18 }
//      })
//
//      find({
//          $and: [
//              {age: { $ge: 18 } },
//              {name: /^S/ }
//          ]
//      })
//
//  =====================================================================================================
//  After finding the wanted documents, you might want to sort the results according to certain fields.
//  In that case, we would simply use sort() method right after the find() done its job'
//  
//          find(...).sort( sortOrder )
//
//  The sortOrder object specifies how to sort the result. Maybe we want to sort by age? by name?
//  For basics, we choose one or more field length, and 1 indicates to sort in ascending order,
//  while -1 indicates to sort in descending order
//  
//          find(...).sort({
//              age: -1, name: 1                    <<= In case age sorting is a tie, sort by name
//          })

async function queryDocumentExample() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("\nConnected successfully to local MongoDB server!\n");

        const nativeDriverExampleDB = client.db('native_driver_example');
        const exampleUsersCollections = nativeDriverExampleDB.collection('example_users');

        //  Query all users where name string starts with V or v
        console.log("List of people with name starting with V:");
        console.dir( await exampleUsersCollections.find({
            name: /^[vV]/
        }, { projection: { _id: 0, name: 1 }}).toArray() );

        //  Query for user 'Amy' and 'Richard'
        console.log("\n\nUser profile for Amy and Richard:");
        console.dir( await exampleUsersCollections.find({
            $or: [
                { name: 'Amy' },
                { name: 'Richard' }
            ]
        }).toArray() );

        //  Query all users. Sort by name, then address
        console.log("\n\nList of users alphabetically:");
        console.dir( await exampleUsersCollections.find({}, { projection: {_id: 0}})
                    .sort({
                        name: 1, address: 1
                    }).toArray() );
    } finally {
        client.close();
    }
}

function example4_5() {
    queryDocumentExample()
    .catch(console.err);
}



//====================================
//  CRUD - U for Update
// 🔺 4.6 - Updating Documents 🔺
//====================================
//
// To update documents in MongoDB, one can do it mainly with two ways:
//      >   updateOne() / updateMany()     - Mutates certain fields only. Other fields remain untouched
//      >   replaceOne()                   - Replaces the document entirely, but keeping the _id
//
// To perform update, one would require to create 'update document', which specifies how to update the document.
// The update document should consist of one or more update operators, like:
//      >   $set
//      >   $inc
//      >   $unset   (remove field)
//      >   $rename  (rename field)
//      >   $mul
// One such example of update document would be like:
//      {
//          $set: {
//              name: "Alex"
//          },
//          $inc: {
//              likes: 3                    <<- Increment number of likes by 3
//          }
//      }
//
// As for replace(), simply create a replace document which replaces the entire document with the replacement document
// provided. 
//
// Both update() and replace() takes two arguments, first one is query object, second is either update document or replace document.

async function updateExample() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("\nConnected successfully to local MongoDB server!\n");

        const nativeDriverExampleDB = client.db('native_driver_example');
        const exampleUsersCollections = nativeDriverExampleDB.collection('example_users');

        //  Update Michael's address
        console.log("Updating Michael's Address... ");
        await exampleUsersCollections.updateOne({
            name: 'Michael'
        }, {
            $set: { address: "Sun Street, 16 Avenue" }
        });

        //  Replace the user Michael
        console.log("\n\nReplacing User Michael... ");
        await exampleUsersCollections.replaceOne({
            name: 'Michael'
        }, {
            name: 'Alex',
            address: 'Avenue 32'
        });
    } finally {
        client.close();
    }
}

function example4_6() {
    updateExample()
    .catch(console.err);
}






//====================================
//  CRUD - D for Delete
// ❌ 4.7 - Deleting Documents ❌
//====================================
//
// Deleting is fairly easy. Done through:
//      >   deleteOne()
//      >   deleteMany()
//
// which takes in a query object. Document matching the query object will be deleted.

async function deleteDocumentExample() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("\nConnected successfully to local MongoDB server!\n");

        const nativeDriverExampleDB = client.db('native_driver_example');
        const exampleUsersCollections = nativeDriverExampleDB.collection('example_users');

        //  Delete User John
        console.log('Deleting User John...');
        await exampleUsersCollections.deleteOne({
            name: 'John'
        });

        //  Delete Every User
        console.log('Deleting Every User...');
        await exampleUsersCollections.deleteMany({});
    } finally {
        client.close();
    }
}

function example4_7() {
    deleteDocumentExample()
    .catch(console.err);
}