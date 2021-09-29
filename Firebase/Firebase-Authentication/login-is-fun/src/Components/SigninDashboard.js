import { Redirect } from 'react-router-dom';

import ThirdPartyProvider from './ThirdPartyProvider';
import EmailAuth from "./EmailAuth";


// The Sign in Dashboard on main page - Contains Third party identity provider sign in option & Email+Password (EmailAuth)
function SigninDashboard(props) {
    const { user } = props;

    // If already logged in - Redirect to profile
    if (user)
        return <Redirect to='/profile' />;

    return (
        <main className='container' id='signin'>
            {/* Third party identity providers */}
            <ThirdPartyProvider />

            {/* Email and Password Authentication */}
            <EmailAuth />
        </main>
    );
}

export default SigninDashboard;