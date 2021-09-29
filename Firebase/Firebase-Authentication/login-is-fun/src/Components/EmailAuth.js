import { useState, Fragment } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

function EmailAuth() {
    const [isSignIn, setIsSignIn] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Input fields
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPw, setLoginPw] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPw, setSignupPw] = useState('');
    const [signupConfirmPw, setSignupConfirmPw] = useState('');

    // Log in window
    const login = (
        <form className='authwindow' onSubmit={(e)=> handleLogin(e, loginEmail, loginPw, setIsSubmitting)} >
            <h4 className='authwindow__title'>Log In 🤖</h4>

            <label className='hidden-label' htmlFor='login-email'>Log In Email</label>
            <input type='email' className='authwindow__input' name='email' id='login-email' placeholder='Email' required
                value={loginEmail} onChange={(e)=> setLoginEmail(e.target.value) } />
            
            <label className='hidden-label' htmlFor='login-password'>Log In Password</label>
            <input type='password' className='authwindow__input' name='password' id='login-password' placeholder='Password' required
                value={loginPw} onChange={(e)=> setLoginPw(e.target.value) } />

            <button type='submit' className='general-button button-override' disabled={isSubmitting}>
                Login
            </button>
        </form>
    );

    // Sign up Window
    const signup = (
        <form className='authwindow' onSubmit={(e)=> handleSignUp(e, signupEmail, signupPw, signupConfirmPw, setIsSubmitting) } >
            <h4 className='authwindow__title'>Sign Up 📝</h4>

            <label className='hidden-label' htmlFor='signup-email'>Sign Up Email</label>
            <input type='email' className='authwindow__input' name='email' id='signup-email' placeholder='Email' required
                value={signupEmail} onChange={(e)=> setSignupEmail(e.target.value)} />
            
            <label className='hidden-label' htmlFor='signup-password'>Sign Up Password</label>
            <input type='password' className='authwindow__input' name='password' id='signup-password' placeholder='Password' required
                value={signupPw} onChange={(e)=> setSignupPw(e.target.value)} />
            
            <label className='hidden-label' htmlFor='signup-confirm-password'>Sign Up Confirm Password</label>
            <input type='password' className='authwindow__input' name='confirm-password' id='signup-confirm-password' placeholder='Confirm Password' required
                value={signupConfirmPw} onChange={(e)=> setSignupConfirmPw(e.target.value)} />

            <button type='submit' className='general-button button-override' disabled={isSubmitting}>
                Sign Up
            </button>
        </form>
    );

    // JSX
    return (
        <Fragment>
            <div className='tabs'>
                <button type='button' className={ (isSignIn? 'tab-selected': '') + ' button-override tab'} id='login-tab'
                    onClick={()=> setIsSignIn(true)}>
                    Login
                </button>
                <button className={ (isSignIn? '': 'tab-selected') + ' tab button-override'} id='signup-tab'
                    onClick={()=> setIsSignIn(false)}>
                    Sign Up
                </button>
            </div>
            { isSignIn? login: signup }
        </Fragment>
    );
}


//===========================
// Authentication functions
//===========================

function handleLogin(event, email, pw, setIsSubmitting) {
    event.preventDefault();

    setIsSubmitting(true);

    signInWithEmailAndPassword( getAuth(), email, pw )
    .catch((err)=> {
        window.alert('Login failed. ' + err.message);
        setIsSubmitting(false);
    });
}


// Sign up - Act as event handler for sign up form
function handleSignUp(event, email, pw, confirmPw, setIsSubmitting) {
    event.preventDefault();

    if (pw !== confirmPw) 
        return window.alert('Password and Confirm Password Mismatch!');

    setIsSubmitting(true);

    createUserWithEmailAndPassword( getAuth(), email, pw )
    .catch((err)=> {
        window.alert("Signup failed. " + err.message );
        setIsSubmitting(false);
    });
}



export default EmailAuth;