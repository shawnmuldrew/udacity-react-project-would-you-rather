import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'

class Logout extends Component {

  componentDidMount() {
    this.props.dispatch(setAuthedUser(null))
  }
  
  render() {
    return (
      <Redirect to={{pathname:"/login", state:  {redirect:"/"}}} />
    )
  }
}

export default connect()(Logout)