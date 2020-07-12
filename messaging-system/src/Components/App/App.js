import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from '../../Screens/Home'
import Signup  from '../../Screens/SignUp'
import Login from '../../Screens/Login'
import Dashboard from '../../Screens/Dashboard'

function App() {
  return (

    <Router>

      <Switch>

      <Route path='/' exact component={Home} />

      <Route path='/signup' exact component={Signup} />

      <Route path='/login' exact component={Login} />

      <Route path='/dashboard' exact component={Dashboard} />

      
      </Switch>


    </Router>
  );
}

export default App;
