import Nav from './Nav.js';
import Homepage from './Homepage.js';
import Contacts from './Contacts.js';
import About from './About.js';

// In order to use Routing, we have to install the package 'react-router-dom'
// We would use BrowserRouter, Route, Swtich (and maybe Link or useHistory) for common tasks
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';



function App() {
  //======
  // JSX
  //======
  return (
    <BrowserRouter>
      <Nav />

      <Switch>
        <Route exact path='/'>
          <Homepage />
        </Route>
        <Route exact path='/about'>
          <About />
        </Route>
        <Route exact path='/contacts'>
          <Contacts />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
