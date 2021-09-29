import { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { signOut, getAuth, updateProfile } from 'firebase/auth';

function Profile(props) {
    let { user } = props;
    const [ isEditingDisplayName, setIsEditingDisplayName ] = useState(false);
    const [ nameField, setNameField ] = useState( (user && user.displayName) || 'Anonymous' );

    //  Not logged in - Redirect to home page
    if (!user)
        return <Redirect to='/' />;


    // Partial JSX
    const notEditingDisplayNameJSX = (
        <h4 id='profile__displayName'>
            { nameField }
            <button type='button' className='button-override' id='profile__minibutton' onClick={()=> setIsEditingDisplayName(true)}>
                <i className="fas fa-pen"></i>
            </button>
        </h4>
    );
    const editingDisplayNameJSX = (
    <Fragment>
        <input type='text' value={nameField} onChange={(e)=> setNameField(e.target.value) } id='profile__edit' />
        <button type='button' className='button-override' id='profile__minibutton' 
            onClick={()=> changeDisplayName(user, nameField, setIsEditingDisplayName)} >
            <i className="fas fa-check"></i>
        </button>
    </Fragment>
    );


    return (
        <main className='container'>
            <div id='profile'>
                <img src={ user.photoURL || 'hacker.svg' } alt='profile pic' id='profile__img' />
                <div id='profile__data'>
                    { isEditingDisplayName? editingDisplayNameJSX: notEditingDisplayNameJSX }
                    <p id='profile__email'>Email: { user.email || 'Not provided' }</p>
                    <p id='profile__id'>UID: { user.uid }</p>
                </div>
            </div>
            <button type='button' className='general-button button-override' 
                onClick={ async ()=> await signOut( getAuth() ) }>
                    Sign Out
            </button>
        </main>
    );
}


function changeDisplayName(user, newName, setIsEditingDisplayName) {
    updateProfile( user, { displayName: newName })
    .then(()=> setIsEditingDisplayName(false))
    .catch((err)=> window.alert(err.message));
}

export default Profile;