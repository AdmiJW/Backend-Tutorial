import { useState } from 'react';
import { useParams } from 'react-router-dom';

function EditBlog(props) {
    const { _id } = useParams();
    const [ blog ] = props.blogs.filter((blog)=> blog._id === _id );

    // Filter out the posts to select only the one chosen to edit

    const [title, setTitle] = useState(blog.title);
    const [author, setAuthor] = useState(blog.author);
    const [content, setContent] = useState(blog.content);

    const [isSubmitting, setIsSubmiting] = useState(false);

    // JSX
    return (
        <main>
            <h2 className='title'>Edit Blog ✏️</h2>

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

export default EditBlog;