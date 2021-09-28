import { useState, useEffect } from 'react';
import firestore from '../firestore';

function CreateBlog(props) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    const [isSubmitting, setIsSubmiting] = useState(false);

    // JSX
    return (
        <main>
            <h2 className='title'>Create New Blog ✏️</h2>

            <form className='blog__form'>
                <input type='text' placeholder='Title' name='title' value={title} onChange={(e)=> setTitle(e.target.value)} required/>
                <input type='text' placeholder='Author' name='author' value={author} onChange={(e)=> setAuthor(e.target.value)} required/>
                <textarea name='content' placeholder='Blog Content (Supports Markdown)' value={content} required
                    onChange={(e)=> setContent(e.target.value)}></textarea>

                <button type='submit' id='blog__submit_button' disabled={isSubmitting} >
                    { isSubmitting? "Submitting...": "Submit" }
                    { isSubmitting? <i className="fas fa-spinner" id='blog__submit_spinner'></i>: null }
                </button>
            </form>
        </main>
    );
}


// Submits a new document to the firestore.

export default CreateBlog;