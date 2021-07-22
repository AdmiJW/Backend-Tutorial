
/*
    ====================================
    🤫 5.0 - Mongoose.js 🤫
    ====================================

    As we had seen in Section 4.0, we have learnt how to manipulate MongoDB databases through NodeJS environment.
    However, there seems to be still quite some problems:
        >   Documents does not have a unified structure. In the same collection, one document may represent a
            user, and another may represent a delivery order
        >   Data types are not enforced. What if data type are supposed to be int, but ends up being a string?

    There can be more problems which make using MongoDB Native Driver tiresome as we need to implement details
    ourselves.
    Instead, use mongoose.js, which is a popular ODM for mongoDB.

    There are two kinds of database set up, which are ORM (Object Relation Mapping)
    or ODM (Object Document Mapping). ORM maps an object with a relational world, 
    which is used with relational databases like Postgres.
    ODM, on the other hand, maps objects with a Document based database like MongoDB.

    Let's see how can we use mongoose.js to manipulate our MongoDB database easily!
*/



