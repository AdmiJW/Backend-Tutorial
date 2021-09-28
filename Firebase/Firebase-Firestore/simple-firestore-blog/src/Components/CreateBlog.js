import { useState } from 'react';
import firestore from '../firestore';
import { useHistory } from 'react-router-dom';

function CreateBlog(props) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    // 0 - Haven't submit.
    // 1 - Submitting
    // 2 - Submitted
    const [submitStatus, setSubmitStatus] = useState(0);
    const history = useHistory();

    // Submitted successfully. Redirect back to home page.
    if (submitStatus === 2) history.push('/');

    // JSX
    return (
        <main>
            <h2 className='title'>Create New Blog ✏️</h2>

            <form className='blog__form' onSubmit={(e)=> addPost(e, title, author, content, setSubmitStatus)}>
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
function addPost(event, title, author, content, setSubmitStatus) {
    event.preventDefault();

    if ( !(title && author && content) ) return;
    setSubmitStatus(1);

    firestore.addDoc( firestore.collection(firestore.getFirestore(), 'blogs'), {
        title, author, content,
        date: firestore.serverTimestamp()
    }).then(()=> {
        setSubmitStatus(2);
    }).catch((err)=> {
        window.alert('Unable to create post. ' + err);
    });
}

export default CreateBlog;