import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Contacts() {
    const [comment, setComment] = useState('');
    const history = useHistory();

    //=====================
    // Event Handlers
    //=====================
    const onCommentChange = (e)=> setComment(e.target.value);
    const onFormSubmit = (e)=> {
        e.preventDefault();
        setComment('');
        console.log("Form submitted!");

        setTimeout(() => {
            history.push('/');
        }, 1500);
    }

    //======
    // JSX
    //======
    return (
        <main className='container py-5'>
            <h1 className='display-1 text-center'>Contact Us</h1>
            <form onSubmit={onFormSubmit} className='d-flex flex-column align-items-center gap-4'>
                <textarea name='comment' id='comment' placeholder='Your Comments' value={comment} 
                    onChange={onCommentChange} className='w-50'></textarea>
                <button className='btn btn-primary px-3 py-2 fs-5' type='submit' disabled={comment === ''}>Submit</button>
            </form>
        </main>
    );
}

export default Contacts;