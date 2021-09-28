import { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import firestore from '../firestore';

function Blog(props) {
    const [pendingDel, setPendingDel] = useState(false);

    // useMemo to ensure blogs don't keep rerendering whenever there is changes.
    return useMemo(()=> getBlogJSX(props.blog, pendingDel, setPendingDel), [props.blog, pendingDel]);
}


// Returns a JSX. The reason why I didn't just put the rendering logic in Blog Component is because
// I want to use useMemo() to memoize the blog posts.
function getBlogJSX(blog, pendingDel, setPendingDel) {
    const { _id, title, author, content, date } = blog;
    const dateString = date? ( new Date(date.seconds * 1000) ).toDateString(): "";

    // JSX
    return (
        <article className={`blog ${pendingDel? 'pending-delete': ''}`}>
            {/* Meta information about the post - Title, author, date */}
            <div className='blog__header'>
                <div className='blog__meta'>
                    <h4 className='blog__title'>{title}</h4>
                    <p className='blog__authdate'>
                        By <span className='blog__auth'>{author}</span> on <span className='blog__date'>{dateString}</span>
                    </p>
                </div>

                <div className='blog__buttons'>
                    {/* Edit button for editing posts. On right top corner */}
                    <Link to={`/edit-post/${_id}`} className='blog__edit'>
                        <i className="blog__edit fas fa-pen-square"></i>
                    </Link>
                    {/* Delete button for deleting posts. On right top corner */}
                    <button type='button' className='blog__del' onClick={()=> deletePost(_id, setPendingDel)} >
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>

            {/* Actual blog content - Supports Markdown */}
            <ReactMarkdown className='blog__content'>{ content }</ReactMarkdown>
        </article>
    );
}


// Will make a request to firestore to delete a post given the document id. 
// setPendingDel is simply a state changing function given by useState() hook
function deletePost(_id, setPendingDel) {
    setPendingDel(true);
    firestore.deleteDoc( firestore.doc( firestore.getFirestore(), 'blogs', _id) );
}

export default Blog;