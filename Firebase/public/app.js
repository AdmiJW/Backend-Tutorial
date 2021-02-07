// =========================== DOM =====================================
const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');

const signInButton = document.getElementById('signInBtn');
const signOutButton = document.getElementById('signOutBtn');

const userDetails = document.getElementById('userDetails');

const stuffList = document.getElementById('stuffList');
const createRandomStuff = document.getElementById('createRandomStuff');
// =======================================================================



//  Auth - The sign in and sign up is asynchronous, returning a Promise
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();


//  FireStore
const db = firebase.firestore();
let stuffRef, unsubscribe;



signInButton.onclick = () => auth.signInWithPopup(provider);
signOutButton.onclick = () => auth.signOut();


//  Called everytime when authorization state is changed
//  A callback with user passed in - The user informations
auth.onAuthStateChanged(user => {

    //  If the user is valid: logged in
    if (user) {
        // ======== AUTH ============
        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true;

        userDetails.innerHTML = `
            <img src='${user.photoURL}' alt='user profile pic'/>
            <h2>Welcome ${user.displayName}</h2>
            <p>User ID: ${user.uid}</p>
        `;


        // ========= DATABASE ============
        stuffRef = db.collection('stuff');         //   Reference to the Database Collection named 'Stuff'

        unsubscribe = stuffRef              //  Query the Database collection. It returns a function to unsubscribe
        .where('uid', '==', user.uid)
        .onSnapshot( querySnapShot => {     //  Instantanious update when database is updated. Take callback function

            const items = querySnapShot.docs.map(doc => {
                const data = doc.data();

                if (!data.createdAt) return '';

                const date = data.createdAt.toDate().toString();
                return `<li>${ data.stuff }, Created at ${ date }</li>`
            });

            stuffList.innerHTML = items.join('');
        });

        
        //  Add new list into the database on click of the button
        createRandomStuff.onclick = ()=> {
            const { serverTimestamp } = firebase.firestore.FieldValue;

            stuffRef.add({
                uid: user.uid,
                stuff: faker.commerce.productName(),
                createdAt: serverTimestamp()
            });

        }

    } 
    //  Otherwise the user had logged out!
    else {
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;

        userDetails.innerHTML = '';
        stuffList.innerHTML = '';

        unsubscribe && unsubscribe();   //  Remember to unsubscribe the database reference
    }
});