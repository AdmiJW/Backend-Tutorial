
/*
    ==========================================
        1.0 🍀 Introduction to MongoDB 🍀
    ==========================================

    As opposed to Relational Databases like MySQL, Microsoft Access or Postgres,
    MongoDB is a NoSQL kind of database system, which means it is non-relational,
    and in fact, MongoDB is Rich Document Oriented Database.

    Especially with MongoDB, it operates on Collections of Documents, which
    store datas in the form of JSON. Anyone that is familiar with Javascript,  
    is able to quickly grasp the concept of MongoDB easily 😀

    =========================
        TERMINOLOGIES
    =========================

    Databases
        Databases in SQL hold multiple tables, which might or might not relate to each other.
        In NoSQL like MongoDB, Databases is the same, holding multiple COLLECTIONS

    Collections
        Anologous to Tables in SQL. Collections is simply a collection of DOCUMENTS which
        may held multiple informations (like say, info of 25 customers). In SQL each row
        represent a customer, in MongoDB this is represented by individual documents instead

    Documents
        Say we have a customer. In SQL this information is represented by a single row in
        a table. In MongoDB, this is instead represented by a single document in a Collection.

    Attributes/Fields
        In SQL, each field or attribute is represented by a column. However. since MongoDB uses
        BSON - Binary JSON, it is simply a object property. Simple as that

    Schema
        SQL schema is enforced by table definitions. Each column has fixed datatypes, can only have
        certain values etc etc. While MongoDB does not emphasize on schema, it can easily be enforced
        by programmers!

    Models
        Think of each document as Objects (They are!). Now, models are simply a specialized constructor
        that construct new documents or perform operation on existing ones according to the schema.


    Now you are familiar with the complicated-looking terminologies already, let's went ahead and start
    coding! 
*/