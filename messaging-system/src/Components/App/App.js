import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from '../../Screens/Home'
import Signup from '../../Screens/SignUp'
import Login from '../../Screens/Login'
import Dashboard from '../../Screens/Dashboard'
import NotFound from '../../Screens/NotFound'
import UserRoute from '../../Routes/UserRoute'
import PublicRoute from '../../Routes/PublicRoute';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('userid'))
  return (

    <Router>

      <Switch>

        {/* <!-- Public routes (Home , Register , Login) which do not need authentication--> */}

        <PublicRoute path='/' exact component={Home} isAuthenticated={isAuthenticated} />

        <PublicRoute path='/signup' exact component={Signup} isAuthenticated={isAuthenticated} />

        <PublicRoute path='/login' exact component={Login} isAuthenticated={isAuthenticated} />


        {/* <!-- User route.Thus we need to check the authentication of the user --> */}

        <UserRoute path='/dashboard' exact component={Dashboard} isAuthenticated={isAuthenticated} />


        {/* <!-- In case of incorrect path by the user , we redirect him to notfound page --> */}

        <Route path='*' component={NotFound} />


      </Switch>


    </Router>
  );
}

export default App;
