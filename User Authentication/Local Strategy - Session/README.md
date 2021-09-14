# PassportJS Local Strategy + Session

[__Great Article HERE to know more!__](https://levelup.gitconnected.com/everything-you-need-to-know-about-the-passport-local-passport-js-strategy-633bbab6195)

If you haven't visited the `Express Session` project, visit it first to get better understanding on HTTP and Sessions first.

---

<br>

## Here is an overview of how to implement PassportJS Local Strategy

1. Select our strategy to be used. In this case we'll use passport-local, which the authentication is done via username and password, which we verify it manually.

1. Implement verify callback. See http://www.passportjs.org/docs/configure/. In every strategy that passportJS uses, it require a verify callback which allows us to verify whether the user is authenticated successfully or not. In the case of local strategy, the callback function takes in parameter `(username, password, done)`. We would CALL and RETURN the `done()` function to tell passportjs whether the authentication is successful or not. The done function looks like this:
    ```js
    return done( error, user, additionalMessages )
    ```
    
    * Case I: Authentication successful
    
        Pass null into error, and the user object as user

        ```js
        return done( null, user )
        ```

    * Case II: Authentication failed
        
        Pass null into error, but pass false as user.
        
        ```js
        return done( null, false )
        ```

    * Case III: Authentication failed with reason
        
        Same as Case II, but pass additionalMesage

        ```js
        return done( null, false, { message: "Incorrect Password"} )
        ```

    * Case IV: Exception Occurred
        Simply pass error 

        ```js
        return done(err)
        ```

    In our case, we would lookup in our user database, whether the user exists, and the password hash matches or not.

1. Make passportJS `use()` Local Strategy, with our verify callback passed as argument.

    ```js
    passport.use( new LocalStrategy( verifyCallback ) );
    ```

1. (Optional) - If the credentials are sent to req object in different names other than default 'username' and 'password' (Eg: 'uname' or 'pwd'), then we have to pass in the mapping option to LocalStrategy constructor

    ```js
    passport.use( new LocalStrategy({
        usernameField: 'email',
        passwordField: 'passwd'
    }, verifyCallback) );
    ```

1. Implement serializeUser and deserealizeUser for sessions. After login, each subsequent request will only contain unique cookie to identify the session. 
         
    * Serialize -> Take in user, what is used to identify the user later?
    * Deserialize -> Take in ID, how do I obtain the user back? (Usually by Database lookup)

1. Apply passportjs middleware to our application.

    ```js
    app.use( passport.initialize() );
    app.use( passport.session() );              // If you use sessions, of course. You need express-session implemented
    ```

1. In routes where we need authentication, give it passport.authenticate middleware!
 
    ```js
    passport.authenticate( strategyName, options ))
    ```

    Eg:

    ```js
    app.post('/login', passport.authenticate('local', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true,                 <<- Flashes the error returned from verify callback from Step 1
    }) );
    ```

Hopefully by now you'll be clear on the passportJS work flow.
