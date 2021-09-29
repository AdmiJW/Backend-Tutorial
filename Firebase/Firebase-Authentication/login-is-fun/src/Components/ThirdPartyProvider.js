import { Fragment } from 'react';
import { getAuth, GoogleAuthProvider, TwitterAuthProvider, GithubAuthProvider, FacebookAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth'

function ThirdPartyProvider() {
    // JSX
    return (
    <Fragment>
        <h4 className='subtitle'>Third Party Authentication</h4>
        <div id='third-party'>
            <button type='button' className='logo button-override' id='google' onClick={signInWithGoogle}>
                <i className="fab fa-google"></i>
            </button>

            <button type='button' className='logo button-override' id='facebook' onClick={signInWithFacebook}>
                <i className="fab fa-facebook-f"></i>
            </button>

            <button type='button' className='logo button-override' id='github' onClick={signInWithGithub}>
                <i className="fab fa-github"></i>
            </button>

            <button type='button' className='logo button-override' id='twitter' onClick={signInWithTwitter}>
                <i className="fab fa-twitter"></i>
            </button>
        </div>
    </Fragment>
    );
}


function signInWithGoogle() {
    signInWithPopup( getAuth(), new GoogleAuthProvider() ).catch((err)=> {
        if (err.code === 'auth/popup-closed-by-user') return;
        window.alert('Failed to sign in with google:\n' + err.message);
    });
}

function signInWithTwitter() {
    signInWithPopup( getAuth(), new TwitterAuthProvider() ).catch((err)=> {
        if (err.code === 'auth/popup-closed-by-user') return;
        window.alert('Failed to sign in with twitter:\n' + err.message);
    });
}

function signInWithFacebook() {
    const provider = new FacebookAuthProvider();
    signInWithPopup( getAuth(), provider )
    .then(async (result)=> {
        // Attach the facebook access token to the photoURL. This is due to Facebook GraphQL update
        const accessToken = FacebookAuthProvider.credentialFromResult(result).accessToken;
        const photoURL = result.user.photoURL + `?access_token=${accessToken}&height=150`;
        await updateProfile( result.user, { photoURL });
    })
    .catch((err)=> {
        if (err.code === 'auth/popup-closed-by-user') return;
        window.alert('Failed to sign in with facebook:\n' + err.message);
    });
}

function signInWithGithub() {
    const provider = new GithubAuthProvider();
    signInWithPopup( getAuth(), provider ).catch((err)=> {
        if (err.code === 'auth/popup-closed-by-user') return;
        window.alert('Failed to sign in with github:\n' + err.message);
    });
}

export default ThirdPartyProvider;