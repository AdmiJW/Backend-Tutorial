# Firebase - Firestore 🔥

At the time of writing, `firebase` is at version 9.1.0. Future changes may cause incompatibility with this note.

Always refer to the official documentation [HERE](https://firebase.google.com/docs/firestore)

Firebase is a NoSQL database that is very similar in structure with popular databases like __MongoDB__. Inside of __Collections__ (equiv. table in SQL) consist of multiple __Documents__ (equiv. rows in SQL). 

One point where Firestore stands out from regular database, is the ability to provide real time update to reflect with the changes in the database with `onSnapshot()` method. This provides better user experience as user don't have to refresh the page to see updates on the web page.

Another point is, we don't actually have to set up a server to control access to the database! This means that the clients are going to actually know how to connect to the database if they really dig into it. Isn't that a bad thing? See more in __6.0 - Security Rules__.

<br>

---

## 1.0 - Setup

[Reference](https://firebase.google.com/docs/web/setup?sdk_version=v9)

1. Ensure you had created a __Firebase Project__ (Container for multiple firebase services) in GCP, then initialize a Firestore for the said project.

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
        import * as firestore from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";
    ```

1. Initialize firebase to connect our application with the firebase project. You don't need to write the initialization configuration object yourself, as it is easily retrieved from your web app's console page. Then, retrieve your firestore db reference from firestore module.

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
        const db = firestore.getFirestore();
    ```

    Now clients can easily interact with the database using the existing firestore instance `db`. Let's discuss about __CRUD__ operation using Firebase.

When we call `firestore.getFirestore()`, we get an `Firestore` instance. Later on, we will commonly have to use `DocumentReference` and `CollectionReference` through the methods [`doc()`](https://firebase.google.com/docs/reference/js/firestore_.md#doc) and [`collection()`](https://firebase.google.com/docs/reference/js/firestore_.md#collection_2). Simply think these as pointer to the actual data in the database which we'll use them to perform CRUD operations on our data!

<br>

---

## 2.0 - C - Create

To add documents to our firestore, we mainly do it through methods:

| Method | Description |
|-|-|
| `setDoc()` | Writes to the document referred to by this `DocumentReference`. If the document does not yet exist, it will be created |
| `addDoc()` | Add a new document to specified `CollectionReference` with the given data, assigning it a document ID automatically |

When we use `setDoc()`, we are forced to specify the ID of the document as it requires a `DocumentReference`. This might not make sense in some cases where ID should be auto-generated. In that case, use `addDoc()` instead.

```js
import { collection, addDoc } from "firebase/firestore"; 

// Add a new document with a generated id.
const docRef = await addDoc(collection(db, "cities"), {
  name: "Tokyo",
  country: "Japan"
});
console.log("Document written with ID: ", docRef.id);
```

`setDoc()` will create the document with provided ID if not already exists, otherwise it will overwrite it. HOWEVER, we can set special property `merge: true` to merge with existing document:

```js
import { doc, setDoc } from "firebase/firestore"; 

const cityRef = doc(db, 'cities', 'BJ');
setDoc(cityRef, { capital: true }, { merge: true });
```

<br>

---

## 3.0 - R - Read

There are two ways to retrieve data offered by firestore: 
1. Retrieve the data by calling a method (Once), or 
1. Listen to the data so we obtain a updated snapshot of the data once it changes in the firestore.

| Method | Description |
|-|-|
| `getDoc()` | Reads the document referred to by this `DocumentReference`. (If you give `CollectionReference`, it will retrieve all documents) |
| `onSnapshot()` | An initial call using the callback you provide creates a document snapshot immediately with the current contents of the single document. Then, each time the contents change, another call updates the document snapshot. |
| `where()` | Creates a `QueryConstraint` that enforces that documents must contain the specified field and that the value should satisfy the relation constraint provided. |
| `query()` | Creates a new immutable instance of `Query` that is extended to also include additional query constraints. |
| `orderBy()` | Creates a `QueryConstraint` that sorts the query result by the specified field, optionally in descending order instead of ascending. |
| `limit()` | Creates a `QueryConstraint` that only returns the first matching documents. |


Example of using `getDoc()` to retrieve a single document:

```js
import { doc, getDoc } from "firebase/firestore";

const docRef = doc(db, "cities", "SF");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}
```

Example of using `getDoc()` to retrieve all the documents in a collection.

```js
import { collection, getDocs } from "firebase/firestore";

const querySnapshot = await getDocs(collection(db, "cities"));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});
```

Example of `onSnapshot()`:

```js
import { doc, onSnapshot } from "firebase/firestore";

const unsub = onSnapshot(doc(db, "cities", "SF"), (doc) => {
    console.log("Current data: ", doc.data());
});

// Stop listening to changes. Use this only when you want to
unsub();
```

More complicated example of `onSnapshot()`:

```js
import { collection, query, where, onSnapshot } from "firebase/firestore";

const q = query(collection(db, "cities"), where("state", "==", "CA"));
const unsubscribe = onSnapshot(q, (snapshot) => {
  //docChanges() filter out documents that are not changed
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
        console.log("New city: ", change.doc.data());
    }
    if (change.type === "modified") {
        console.log("Modified city: ", change.doc.data());
    }
    if (change.type === "removed") {
        console.log("Removed city: ", change.doc.data());
    }
  });
});

// Stop listening to changes
unsubscribe();
```

To perform query, first construct the `Query` object, then use it along with `getDoc(query)` or other equivalent methods to retrieve document.

```js
import { collection, query, where, getDocs } from "firebase/firestore";

const q = query(collection(db, "cities"), where("capital", "==", true));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});
```

The `where()` method takes three parameters: a field to filter on, a comparison operator, and a value. Cloud Firestore supports the following comparison operators:

1. `<` less than
1. `<=` less than or equal to
1. `==` equal to
1. `>` greater than
1. `>=` greater than or equal to
1. `!=` not equal to
1. `array-contains`
1. `array-contains-any`
1. `in`
1. `not-in`

Example of `limit()` and `orderBy()`. 

```js
import { query, orderBy } from "firebase/firestore";  

const q = query(citiesRef, orderBy("state"), orderBy("population", "desc"));
```

<br>

---

## 4.0 - U - Update

To update existing documents in our firestore, we mainly use the `updateDoc()` method. However, there may be more complex updates we have to do:

| Method | Description |
|-|-|
| `updateDoc()` | Updates fields in the document referred to by the specified `DocumentReference`. The update will fail if applied to a document that does not exist. |
| `arrayUnion()` | Returns a special value that can be used with `setDoc()` or `updateDoc()` that tells the server to union the given elements with any array value that already exists on the server. Each specified element that doesn't already exist in the array will be added to the end. If the field being modified is not already an array it will be overwritten with an array containing exactly the specified elements. |
| `arrayRemove()` | Returns a special value that can be used with `setDoc()` or that tells the server to remove the given elements from any array value that already exists on the server. All instances of each element specified will be removed from the array. If the field being modified is not already an array it will be overwritten with an empty array. |
| `increment()` | Returns a special value that can be used with `setDoc()` or `updateDoc()` that tells the server to increment the field's current value by the given value. |

Example of `updateDoc()`:

```js
import { doc, setDoc, updateDoc } from "firebase/firestore"; 

// Create an initial document to update.
const frankDocRef = doc(db, "users", "frank");
await setDoc(frankDocRef, {
    name: "Frank",
    favorites: { food: "Pizza", color: "Blue", subject: "recess" },
    age: 12
});

// To update age and favorite color:
await updateDoc(frankDocRef, {
    "age": 13,
    "favorites.color": "Red"
});
```

Dot notation allows you to update a single nested field without overwriting other nested field. If you update a nested field without dot notation, you will overwrite the entire map field

<br>

---

## 5.0 - D - Delete

We can delete a whole collection, a single document, or just deleting some fields in the document.

| Method | Description |
|-|-|
| `deleteDoc()` | Deletes the document referred to by the specified `DocumentReference`. |
| `deleteField()` | Returns a sentinel for use with `updateDoc()` or `setDoc()` with `{merge: true}` to mark a field for deletion. |

> __Deleting a document does not delete its subcollections!__

Example of `deleteDoc()`:
```js
import { doc, deleteDoc } from "firebase/firestore";
await deleteDoc(doc(db, "cities", "DC"));
```

Example of `deleteField()`:
```js
import { doc, updateDoc, deleteField } from "firebase/firestore";

const cityRef = doc(db, 'cities', 'BJ');

// Remove the 'capital' field from the document
await updateDoc(cityRef, {
    capital: deleteField()
});
```

To delete an entire collection or subcollection in Cloud Firestore, retrieve all the documents within the collection or subcollection and delete them. __HOWEVER__, since this is from client-side perspective, you are __NOT RECOMMENDED__ to even allow this to happen!

<br>

---

## 6.0 - Security Rules

[Reference](https://firebase.google.com/docs/firestore/security/rules-structure)

Traditionally, if client has to interact with the database, its request would have been validated by the server beforehand, then the server sends the request to the database on behalf of the client. 

Now with firebase client side library, the client knows how to connect to the database. Wouldn't that be dangerous in case of malicious users? Yes, if you didn't properly set up security rules.

Security rules are basically validation checks that is performed on every firebase request sent by the client, therefore granting or denying the request based on conditions. For example, a client may only be granted access to __write__ to the database only if he is logged in, while any user may be granted the access to __read__ from the database.

### __Structuring__:

Cloud Firestore Security Rules always begin with the following declaration:

```js
service cloud.firestore {
  match /databases/{database}/documents {
    // ...
  }
}
```

`service cloud.firestore` declares that the security rule is for firestore, to avoid conflict with other GCP products like cloud storage.

`match /database/{database}/documents` specifies that rules should match any Cloud Firestore database in the project 

Basic rules consist of a `match` statement specifying a document path and an `allow` expression detailing when reading the specified data is allowed. All match statements should point to documents, not collections. In case you want to refer to ALL documents, use wildcard `{}`. When nesting match statements, the path of the inner match statement is always relative to the path of the outer match statement

```js
service cloud.firestore {
  match /databases/{database}/documents {

    // Match any document in the 'cities' collection
    match /cities/{city} {
      allow read: if <condition> && <condition2> && <condition3>;
      allow write: if <condition> && <condition2> && <condition3>;
    }
  }
}
```

From above example, a request is granted to write if it satisfies all 3 conditions provided (Eg: logged in, is editor, is email verified). These are the available operations to allow:

| Operation | Definition |
|-|-|
| `get` | Single document read requests |
| `list` | Queries and collection read requests |
| `create` | Writes to nonexistent documents |
| `update` | Writes to existing documents |
| `delete` | Delete operations |
| `read` | Consist of `get` and `list` |
| `write` | Consist of `create`, `update` and `delete` |

If you want rules to apply to an arbitrarily deep hierarchy, use the recursive wildcard syntax, {name=**}

```js
service cloud.firestore {
  match /databases/{database}/documents {
    // Matches any document in the cities collection as well as any document
    // in a subcollection.
    match /cities/{document=**} {
      allow read, write: if <condition>;
    }
  }
}
```

### __Conditions__:

We have access to these special objects when writing rules:

| Object | Description |
|-|-|
| `request.auth` | User's authentication state. `null` if no authentication |
| `resource.data` | The document in the database, before changes are applied |
| `request.resource.data` | Contains the future state of the document - if the changes has been granted |
| `exists()` | Returns true or false depending on whether the __fully specified document path__ provided exists. Useful to check if the user is indeed in the database | 
| `get()` | Returns the document that is specified by the __fully specified document path__. Use `.data` to check fields of the document |

Example of using `request.auth` - Allow logged in user to change their own data

```js
service cloud.firestore {
  match /databases/{database}/documents {
    // Make sure the uid of the requesting user matches name of the user
    // document. The wildcard expression {userId} makes the userId variable
    // available in rules.
    match /users/{userId} {
      allow read, update, delete: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null;
    }
  }
}
```

Using the `get()` and `exists()` functions, your security rules can evaluate incoming requests against other documents in the database. The `get()` and `exists()` functions both expect fully specified document paths. When using variables to construct paths for `get()` and `exists()`, you need to explicitly escape variables using the `$(variable)` syntax.

```js
service cloud.firestore {
  match /databases/{database}/documents {
    match /cities/{city} {
      // Make sure a 'users' document exists for the requesting user before
      // allowing any writes to the 'cities' collection
      allow create: if request.auth != null && exists(/databases/$(database)/documents/users/$(request.auth.uid))

      // Allow the user to delete cities if their user document has the
      // 'admin' field set to 'true'
      allow delete: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.admin == true
    }
  }
}
```