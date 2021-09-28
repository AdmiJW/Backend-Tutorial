import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import firestore from '../firestore';

// Page to allow user to edit a blog entry.
function EditBlog(props) {
    const { _id } = useParams();
    const blog = props.blogs.filter((blog)=> blog._id === _id )[0] || {};
    const history = useHistory();

    const [title, setTitle] = useState(blog.title);
    const [author, setAuthor] = useState(blog.author);
    const [content, setContent] = useState(blog.content);
    // 0 - Not submitted
    // 1 - Submitting
    // 2 - Submitted
    const [submitStatus, setSubmitStatus] = useState(0);

    // Blog is empty - it means no such blog found to edit.
    if ( !Object.keys(blog).length ) {
        window.alert(`Error: No post with ID ${_id} found! Redirecting back to homepage...`);
        history.replace('/');
    }

    // Submitted
    if (submitStatus === 2) history.push('/');

    // JSX
    return (
        <main>
            <h2 className='title'>Edit Blog ✏️</h2>

            <form className='blog__form' onSubmit={(e)=> updatePost(e, _id, title, author, content, setSubmitStatus)}>
                <input type='text' placeholder='Title' name='title' value={title} onChange={(e)=> setTitle(e.target.value)} required/>
                <input type='text' placeholder='Author' name='author' value={author} onChange={(e)=> setAuthor(e.target.value)} required/>
                <textarea name='content' placeholder='Blog Content (Supports Markdown)' value={content} required
                    onChange={(e)=> setContent(e.target.value)}></textarea>

                <button type='submit' id='blog__submit_button' disabled={submitStatus} >
                    { submitStatus? "Submitting...": "Submit" }
                    { submitStatus? <i className="fas fa-spinner" id='blog__submit_spinner'></i>: null }
                </button>
            </form>
        </main>
    );
}


// Submits a request to the firestore to add a new blog post
function updatePost(event, _id, title, author, content, setSubmitStatus) {
    event.preventDefault();

    if ( !(title && author && content) ) return;
    setSubmitStatus(1);

    firestore.setDoc( firestore.doc(firestore.getFirestore(), 'blogs', _id), {
        title, author, content,
        date: firestore.serverTimestamp()
    }).then(()=> {
        setSubmitStatus(2);
    }).catch((err)=> {
        window.alert('Unable to update post. ' + err);
    });
}

export default EditBlog;