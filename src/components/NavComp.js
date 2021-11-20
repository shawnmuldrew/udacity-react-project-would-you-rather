import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Navbar  from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import { Container } from 'react-bootstrap'

class NavComp extends Component {
  render() {
    const {authedUser} = this.props
    console.log(authedUser)
    return (
      <Navbar bg="light" expand="sm" className="nav">
        <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" exact activeClassName="active">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/add" activeClassName="active">
              New Question
            </Nav.Link>
            <Nav.Link as={NavLink} to="/leaderboard" activeClassName="active">
              Leader Board
            </Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            {authedUser === null
            ? null
            : <Navbar.Text className="navuser">
                User: {authedUser}
              </Navbar.Text>
            }
            <Nav.Link as={NavLink} to="/logout" activeClassName="active">
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  }
}

export default connect(mapStateToProps)(NavComp)