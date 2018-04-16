import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../css/NewTripForm.css'


class Header extends Component {
  renderLinks() {

    if (this.props.authenticated) {
      return (
        <Link to="/signout">Sign out</Link>
      )
    } else {
      return  (
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav" id="sign-up-in">
            <Link className="nav-item nav-link" to="/signup">Sign up</Link>
            <Link className="nav-item nav-link" to="/signin">Log in</Link>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Flight Finder</Link>
        {this.renderLinks()}
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps)(Header)

      // <nav className="navbar">
      //   <Link to="/">Flight Finder</Link>
      //   {this.renderLinks()}
      // </nav>
