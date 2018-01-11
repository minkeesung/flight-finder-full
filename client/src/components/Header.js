import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/lib/Navbar'
import NavItem from 'react-bootstrap/lib/NavItem'
// import NavDropdown from 'react-bootstrap/lib/NavDropdown'
// import MenuItem from 'react-bootstrap/lib/MenuItem'
import Nav from 'react-bootstrap/lib/Nav'
import { LinkContainer } from 'react-router-bootstrap'


class Header extends Component {
  renderLinks() {

    if (this.props.authenticated) {
      return (
        <Nav pullRight>
          <LinkContainer to="/signout">
            <NavItem eventKey={1} href="#">Sign out &nbsp;&nbsp;&nbsp;</NavItem>
          </LinkContainer>
        </Nav>
      )
    } else {
      return  (
        <Nav pullRight>
          <LinkContainer to="/signup">
            <NavItem eventKey={1} href="#">Sign up</NavItem>
          </LinkContainer>
          <LinkContainer to="/signin">
            <NavItem eventKey={2} href="#">Log in &nbsp;&nbsp;&nbsp;</NavItem>
          </LinkContainer>
        </Nav>
      )
    }
  }

  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Flight Finder</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {this.renderLinks()}
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps)(Header)
