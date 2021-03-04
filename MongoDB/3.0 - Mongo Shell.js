
//==================================================================
//  To run this code, go to 3.0 - Executor.bat and run that code!
//==================================================================

// const { Db } = require("mongodb");


// =================================
//   🐚 3.0 - Mongo Shell 🐚
// =================================
//
// Before diving deep into mongoose, let's be familiar with the very native way of interacting
// with MongoDB first: Using Mongo Shell
//
// If setup properly, you should be able to immediately start Mongo Shell by typing 'mongo' in your
// CLI. Otherwise, set the environment variables to point to the bin directory of the installation
//



//  =======================
//  1 - Database Operations
//  =======================


    //  Show the database you are in currently. Later we access collections and documents through this
    //  db as well!
    print('\nShowing Currently Selected Database')
    db              
    print('\n')


    //  List all the available databases through the connection.
    print('Listing All the Available Databases')
    show dbs        
    print('Listing All the Available Databases 2')
    show databases
    print('\n')


    //  Create, or get into a particular database to operate on. They use the very same syntax:
    //  Note that if a database does not have any collections in it, it is not going to show up
    print('Selecting a Database / Creating a new Database')
    use mongo_shell_tutorial
    print('\n')


    //  Deleting a Database (Quite a dangerous operation I would say)
    print('Deleting a Database')
    db.dropDatabase()
    print('\n')


//  ==========================
//  2 - Collections Operations
//  ==========================

    
    //  Create a new Collection in the current database
    print('Creating a new Collection')
    db.createCollection('My Collection 1')
    db.createCollection('My_Collection_2')
    print('\n')


    //  Show all the existing collections in the currently selected database
    print('Show all the existing Collections in current database')
    show collections
    print('\n')


    //  Dropping a Collection without Deleting a collection itself - Just remove all documents
    print('Dropping a Collection')
    db['My Collection 1'].drop()
    db.My_Collection_2.drop()
    print('\n')


    //  Actual Removing the entire Collection including itself
    print("Removing a Collection")
    db['My Collection 1'].remove({})
    db.My_Collection_2.remove({})
    print("\n")



//  ================================
//  3 - Document Operations - CRUD
//  ================================

    use mongo_shell_tutorial
    db.createCollection('CRUD')          //  Note it will overwrite existing collection


    //==============================
    //  C - CREATE
    //==============================

    //  Inserting a new document
    print("Inseting new document")
    db.CRUD.insert({
        name: "AdmiJW",
        gender: "Male",
        tel: "123456",
        date: Date()
    })
    db.CRUD.insert({
        name: "Jack",
        gender: "Male"
    })
    print('\n')
    
    
    
    //  Insert multiple documents
    print("Inserting multiple documents")
    db.CRUD.insertMany([
        {
            name: 'Peter',
            age: 25
        },
        {
            name: "Tim",
            hobby: "Gaming",
            age: 13
        }
    ])
    print("\n")



    //============================
    //  R - Read
    //============================

    //  Querying
    print("Basic Querying - Exact Match")
    db.CRUD.find({ gender: "Male" })
    print("\n")


    //  Query One
    print("Basic Querying - First Match Only")
    db.CRUD.find({ name: "AdmiJW" })
    print("\n")


    //  Prettify Output 
    print("Prettify Output")
    db.CRUD.find({ gender: "Male" }).pretty()
    print("\n")


    //  Basic Output Sorting. { <field>: 1/-1 }     -   1 for ascending, -1 for descending
    print("Basic Sorting")
    db.CRUD.find({}).sort({ name: 1 })
    print("\n")


    //  Count Results
    print("Count Results")
    db.CRUD.find({}).count()
    print("\n")


    //  Limit Search Result
    print("Limit Results")
    db.CRUD.find({}).limit(2)
    print("\n")


    //  Use Query and Projection Operators for Conditional Queries
    print("Conditional Queries")
    db.CRUD.find({
        age: {$gt: 20}
    })
    print("\n")



    //======================
    //  UPDATE
    //======================

    //  Updating takes the form ( updatefilter, updateaction ), using Update Operators like $set, $unset, $inc, $rename
    //  If without operators, it simply replaces entire document with the given updateaction object
    print("Updating - Set and Unset")
    db.CRUD.update({
        age: {$gt: 18}
    }, {
        $set: { isAdult: true, status: 'Approved' }
    })
    print("\n")



    //=======================
    //  DELETE
    //=======================

    //  Deleting all records that match: Using operators
    print("Deleting")
    db.CRUD.remove({
        age: {$lt: 18}
    })
    print("\n")



