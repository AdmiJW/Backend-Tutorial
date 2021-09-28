import { BrowserRouter, Route, Switch, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import firestore from './firestore';

// Components
import Navbar from './Components/Navbar';
import BlogList from './Components/BlogList';
import CreateBlog from './Components/CreateBlog';
import EditBlog from './Components/EditBlog';

function MainPage() {

    const [blogs, setBlogs] = useState([]);
    useEffect(()=> {
        const db = firestore.getFirestore();

        // Fetch blog posts from database, and provide realtime update!
        const query = firestore.query( firestore.collection(db, 'users'), firestore.orderBy('date', 'desc') );
        firestore.onSnapshot( query, (snapshot)=> {
            snapshot.docChanges().forEach((change) => {
                const blog = Object.assign({ _id: change.doc.id }, change.doc.data());

                if (change.type === "added") {
                    setBlogs((prevBlogs)=> {
                        return [ ...prevBlogs, blog ];
                    });
                }
                if (change.type === "modified") {
                    setBlogs((prevBlogs)=> {
                        return prevBlogs.map((b)=> b._id == blog._id? blog: b);
                    });
                }
                if (change.type === "removed") {
                    setBlogs((prevBlogs)=> {
                        return prevBlogs.filter((b)=> b._id !== blog._id);
                    });
                }
            });
        });
    }, []);


    // JSX1
    return (
        <BrowserRouter>
            {/* Navbar */}
            <Navbar />

            {/* Views */}
            <Switch>
                {/* Create a new post */}
                <Route path='/create-post'>
                    <CreateBlog />
                </Route>
                {/* Edit post. Post ID is in the */}
                <Route path='/edit-post/:_id'>
                    <EditBlog blogs={blogs} />
                </Route>
                {/* View Posts */}
                <Route path='/'>
                    <BlogList blogs={blogs} />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default MainPage;
