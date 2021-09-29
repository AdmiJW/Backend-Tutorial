# Firebase - Authentication 🔥

At the time of writing, `firebase` is at version 9.1.0. Future changes may cause incompatibility with this note.

Always refer to the official documentation [HERE](https://firebase.google.com/docs/auth)

<br>

Implementing your own authentication system is a pain in the ass. There are libraries like `express-session` or `jsonwebtoken` to help you out, but it probably takes quite some time to complete implementing.

When you are building a simple app and you want it fast, look no further than Firebase Authentication! At the time of writing, the free spark plan provides unlimited authentication requests!

You should be informed that Firebase Authentication uses mostly JWT to do its authentication, as opposed to traditional session-based approach.

---

## 1.0 - Setup

[Reference](https://firebase.google.com/docs/web/setup?sdk_version=v9)

1. Ensure you had created a __Firebase Project__ (Container for multiple firebase services) in GCP, then initialize the Authentication Service for the said project.

1. Commonly in web projects, firebase is used in conjunction with popular web frameworks like __Vue__, __React__ or __Angular__. In that case, one would probably use `npm` to install and include firebase in their project. 

    ```
    npm install firebase
    ```

    Now, we won't be using any web frameworks. In that case we would include firebase through CDN method in our JS script. The firebase script export methods that we will use in our application (The way to import is identical as if we are using `npm` method)

    ```js
        // IMPORTANT: Change the Version number as needed
        import { initializeApp } from "https://www. gstatic.com/firebasejs/9.1.0/firebase-app.js";
        // TODO: Add SDKs for Firebase products that you want to use
        // Don't import all in production code, as webpack can help you reduce the code to only those really used in your application!
        import * as firebaseAuth from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";
    ```

1. Initialize firebase to connect our application with the firebase project. You don't need to write the initialization configuration object yourself, as it is easily retrieved from your web app's console page. Then, you may retrieve the `firebase.auth.Auth` via ` instance to get started

    ```js
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
            apiKey: "YOUR API KEY",
            authDomain: "YOUR DOMAIN",
            projectId: "YOUR PROJECT ID",
            storageBucket: "...",
            messagingSenderId: "...",
            appId: "...",
            measurementId: "..."
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const auth = firebaseAuth.getAuth();
    ```

    Now, you are ready to authenticate clients! Here we go to explore some interfaces!


<br>

---

## 2.0 - Login with Email + Password

[Reference](https://firebase.google.com/docs/auth/web/start)

To provide authentication service with email and password, make sure you have enabled the Email/Password method in firebase console.

Once that is enabled, you may use the following methods frequently:

| Method | Description |
|-|-|
| `getAuth` | To get the `Auth` instance, which is required in every method call below |
| `createUserWithEmailAndPassword` | Creates a new user with the provided email and password. Once created, also logs in the user automatically |
| `signInWithEmailAndPassword` | Sign in the user with the provided email and password |
| `onAuthStateChanged` | Listens to the authentication state changes - Mainly login and logout |
| `Auth.currentUser` | Retrieves the current logged in user |


Example of `createUserWithEmailAndPassword`:
```js
const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
```

Example of `signInWithEmailAndPassword`:
```js
const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
```

When the user is logged in via `createUserWithEmailAndPassword` or `signInWithEmailAndPassword`, you'll need some way of knowing when the user is logged in. There are 2 ways, which one was more recommended:

__(Recommended)__. Use a listener via `onAuthStateChanged` to listen to login and logout events. Upon login, the callback function will be called with the user passed in. On the other hand, `null` will be passed if the user logged out.

This way of retrieving user is better than `Auth.currentUser`, as the latter may be called during intermediate state. You cannot predict when the authentication is complete since it is an asynchronous process!

```js
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});
```

If you are using `react` or some frontend framework, then you may assign the returned `user` to the state, then the framework will handle the rest for you :).

Some common properties that you'll want to access from the user is probably:

* `user.displayName`
* `user.email`
* `user.emailVerified`
* `user.photoURL`
* `user.uid`

See other at the [User reference](https://firebase.google.com/docs/reference/js/v8/firebase.User)

For other user information like blog posts or comments, that is not the job for Firebase Authentication. Look into using real database like Firestore instead.


<br>

---

## 3.0 - Third Party Authentication Service

[Reference](https://firebase.google.com/docs/auth/web/google-signin)

You are probably guility of preferring the convenience of using Google, Facebook or other social media sites to log into online services. Your clients may think the same, therefore you should implement it too.

| Method | Description |
|-|-|
| `signInWithPopup` | Pops up a window to sign in with the `AuthProvider`. You probably seen this before |
| `signInWithRedirect` | Redirects to the sign in page for sign in process. This is preferred on mobile devices |
| `getRedirectResult` | When the sign in process with redirect is completed or interrupted, you will obtain the outcome from this method |

Note that the above `signInWithPopup` and `signInWithRedirect` both requires a `AuthProvider` instance. `AuthProvider` essentially contains information of which authentication service to use, and also what information is required to access from the authentication provider. Here are some examples of concrete `AuthProviders`:

* `FacebookAuthProvider`
* `GithubAuthProvider`
* `GoogleAuthProvider`

```js
const auth = getAuth();
const provider = new GoogleAAuthProvider();
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
```

Using third party authentication provider would probably require you to setup on two sides:

* On firebase console, you need to enable the said service by providing API key and API secret.
* You would need to visit the console on the authentication provider's website to retrieve the API key and secret.

There is also some twist and turns depending on the authentication provider:

* Twitter - You would need to apply for Twitter Developer Account. It involves you filling up forms and would take 1-2 days for approval.
* Facebook - Using photoURL is not enough. The graphQL of Facebook requires you to also pass in `access_token` in query parameter.


<br>

---

## 4.0 - Other Operations

Of course, this is still not all to implement a fully functional authentication system. You may want:

* Forgot password - Send password reset email via `sendPasswordResetEmail`
* Change password - Reauthenticate via `reauthenticateWithCredential` and update password with `User.updatePassword`
* Email verification - `sendEmailVerification` 
* Phone verification
* and many more...

<br>

---
