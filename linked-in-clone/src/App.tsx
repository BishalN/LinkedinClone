import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login } from '../src/pages/login';
import { Landing } from './pages';
import { Profile } from './pages/in/Profile';
import { Mynetwork } from './pages/mynetwork';
import { Connection } from './pages/mynetwork/connections';
import { Notification } from './pages/notifications';
import { Register } from './pages/register';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/' component={Landing} exact />
          <Route path='/login' component={Login} exact />
          <Route path='/register' component={Register} exact />
          <Route path='/notifications' component={Notification} exact />
          <Route path='/in/:username' component={Profile} exact />
          <Route path='/mynetwork' component={Mynetwork} exact />
          <Route path='/mynetwork/connections' component={Connection} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
