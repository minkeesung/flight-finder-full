import React, { Component } from 'react';
import 'react-widgets/dist/css/react-widgets.css'

import { BrowserRouter, Route } from 'react-router-dom';

import NewTripForm from './NewTripForm'
import TripDisplay from './TripDisplay'
import Header from './Header'
import Signin from './auth/signin'
import Signup from './auth/signup'
import Signout from './auth/signout'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route exact path="/" component={NewTripForm} />
          <Route path="/trips" component={TripDisplay} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/signout" component={Signout} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
