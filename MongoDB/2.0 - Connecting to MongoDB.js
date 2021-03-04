
/*
    MongoDB is simply a Rich document oriented database that runs in the background of your machine. 
    Due to it using BSON, it is commonly used with NodeJS, a nice Javascript runtime environment that
    is a popular option of backend language.

    Therefore, a library that helps act as the bridge between NodeJS and MongoDB must exist,
    and one of the popular one is: Mongoose

    Let's first install mongoose on our node package, and try connecting to our database
    through it!

        >   npm install mongoose
        >   const mongoose = require('mongoose');

    Note that 'require('mongoose')' call returns a Singleton object, which means it returns
    a Object based on a class, like so:

        >   module.exports = new Mongoose();        //  Not really real implementation, but you get the idea


    Therefore throughout our program, even if the mongoose package is required many times, the object that
    is actually obtained is the very same single object! Say I connected to the database in one module,
    then in another module, the required mongoose object is stay connected to the database, because they
    are the very same!
*/


//  It should be noted that I've put the URL to server is put in .env file, which NodeJS will easily recognize
//  and accessed via process.env.<properties>
require('dotenv').config();
const mongoose = require('mongoose');


(async ()=> {
    try {
        //  Connect to the MongoDB Database. Pass in a few options to prevent using depricated feature
        await mongoose.connect(`mongodb://${process.env.SERVER_URI}`, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        console.log("Successfully Established Connection to MongoDB!");
    } catch (err) {
        console.log("Error Occurred while connecting to the MongoDB server at: " + process.env.SERVER_URI);
        console.log(err);
    }
})();

module.exports = mongoose;

