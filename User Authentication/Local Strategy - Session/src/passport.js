// Here is an overview of how to implement PassportJS Local Strategy
//
// Step 0:  Select our strategy to be used. In this case we'll use passport-local, which the authentication is
//          done via username and password, which we verify it manually.
//
// Step 1:  Implement verify callback. See http://www.passportjs.org/docs/configure/
//          In every strategy that passportJS uses, it require a verify callback which allows us to verify
//          whether the user is authenticated successfully or not.
//          In the case of local strategy, the callback function takes in parameter (username, password, done).
//          We would CALL and RETURN the done() function to tell passportjs whether the authentication is successful or not.
//          
//          The done function looks like this:
//              return done( error, user, additionalMessages )
//          
//          Case I: Authentication successful
//          Pass null into error, and the user object as user
//              return done( null, user )

//          Case II: Authentication failed
//          Pass null into error, but pass false as user.
//              return done( null, false )

//          Case III: Authentication failed with reason
//          Same as Case II, but pass additionalMesage
//              return done( null, false, { message: "Incorrect Password"} )

//          Case IV: Exception Occurred
//          Simply pass error 
//              return done(err)

//          In our case, we would lookup in our user database, whether the user exists, and the password hash matches or not.

// Step 2:  Make passportJS use() Local Strategy, with our verify callback passed as argument.
//          passport.use( new LocalStrategy( verifyCallback ) );

// Step 2.5: (Optional) -   If the credentials are sent to req object in different names other than default 'username' and
//                          'password' (Eg: 'uname' or 'pwd'), then we have to pass in the mapping option to LocalStrategy
//                          constructor

//                          passport.use( new LocalStrategy({
//                              usernameField: 'email',
//                              passwordField: 'passwd'
//                          }, verifyCallback) );

// Step 3:  Implement serializeUser and deserealizeUser for sessions. After login, each subsequent request will only contain
//          unique cookie to identify the session. 
         
//          Serialize -> Take in user, what is used to identify the user later?
//          Deserialize -> Take in ID, how do I obtain the user back? (Usually by Database lookup)

// Step 4:  Apply passportjs middleware to our application.
//              app.use( passport.initialize() );
//              app.use( passport.session() );              // If you use sessions, of course. You need express-session implemented

// Step 4:  In routes where we need authentication, give it passport.authenticate middleware!
 
//              passport.authenticate( strategyName, options ))

//      Eg:
//              app.post('/login', passport.authenticate('local', {
//                  successRedirect: '/profile',
//                  failureRedirect: '/login',
//                  failureFlash: true,                 <<- Flashes the error returned from verify callback from Step 1
//              }) );

// Hopefully by now you'll be clear on the passportJS work flow.

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const path = require('path');

const connection = require( path.join(__dirname,'database.js') );
const User = connection.models.User;
const utils = require( path.join(__dirname, 'utils.js') );



// Step 1: Verify callback
const verifyCallback = (username, password, done)=> {
    User.findOne({ username }, (err, user)=> {
        if (err) return done(err);
        if (!user) return done(null, false, {message: `No user with username ${username} found!`});
        if (!utils.comparePassword(password, user.passwordHash))
            return done(null, false, {message: 'Incorrect Password'});
        return done(null, user);
    });
};

// Step 2: Apply Local Strategy with the verify callback given
passport.use( new LocalStrategy( verifyCallback ) );

// Step 3: Serializer and Deserializer
passport.serializeUser( (user, done)=> {
    done(null, user._id);
});

passport.deserializeUser( (id, done)=> {
    User.findById(id, (err, user)=> {
        if (err) return done(err);
        if (!user) return done(null, false);
        return done(null, user);
    });
});


// Remember to require() this module for the codes to load!