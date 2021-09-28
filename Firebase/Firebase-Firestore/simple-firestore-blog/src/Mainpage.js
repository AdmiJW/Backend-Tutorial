import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';

import firestore from './firestore';

// Components
import Navbar from './Components/Navbar';
import BlogList from './Components/BlogList';
import CreateBlog from './Components/CreateBlog';
import EditBlog from './Components/EditBlog';

function MainPage() {

    // I store a list of blogs at top level component, so that the blogs don't go away when the client navigates to, say
    // /create-post or something.
    const [blogs, setBlogs] = useState([]);

    // Fetching is ASYNC, and it is effectful code. So use the hook useEffect!
    useEffect(()=> {
        console.log("Fetching blogs from Firestore...");
        const db = firestore.getFirestore();

        // Fetch blog posts from database, and provide realtime update using onSnapshot
        const query = firestore.query( firestore.collection(db, 'blogs'), firestore.orderBy('date', 'desc') );
        const unsub = firestore.onSnapshot( query, (snapshot)=> {
            snapshot.docChanges().forEach((change) => {
                const blog = Object.assign({ _id: change.doc.id }, change.doc.data());

                if (change.type === "added") {
                    setBlogs((prevBlogs)=> {
                        return [ blog, ...prevBlogs ];
                    });
                }
                if (change.type === "modified") {
                    setBlogs((prevBlogs)=> {
                        return prevBlogs.map((b)=> b._id === blog._id? blog: b);
                    });
                }
                if (change.type === "removed") {
                    setBlogs((prevBlogs)=> {
                        return prevBlogs.filter((b)=> b._id !== blog._id);
                    });
                }
            });
        });

        // When the application teardown, remember to unsubscribe from firestore
        return unsub;
    }, []);


    // JSX
    return (
        <BrowserRouter>
            <Navbar />

            <Switch>
                <Route path='/create-post'>
                    <CreateBlog />
                </Route>

                <Route path='/edit-post/:_id'>
                    <EditBlog blogs={blogs} />
                </Route>

                <Route path='/'>
                    <BlogList blogs={blogs} />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default MainPage;
