import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { getAuth, onAuthStateChanged, useDeviceLanguage } from 'firebase/auth';

// Components
import SigninDashboard from './Components/SigninDashboard';
import Profile from './Components/Profile';

function App() {

    const [user, setUser] = useState(null);
    useDeviceLanguage( getAuth() );
    
    // Subscribe to the authentication system to listen for authorization state changes
    useEffect(()=> {
        // Set authentication language

        const unsub = onAuthStateChanged(getAuth(), (user)=> {
            setUser(user);
        });
        return unsub;
    }, []);
    
    // JSX
    return (
        <Router>
            <h1 className='title container'>Sign in is Fun 😄</h1>

            <Switch>
                <Route path='/profile'>
                    <Profile user={user} />
                </Route>  
                <Route path='/'>
                    <SigninDashboard user={user} />
                </Route>          
            </Switch>
        </Router>

    );
}

export default App;
