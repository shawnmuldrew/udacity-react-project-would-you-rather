import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'

class Logout extends Component {

  render() {
    const { dispatch } = this.props
    dispatch(setAuthedUser(null))
    return (
      <Redirect to='/login' />
    )
  }
}


export default connect()(Logout)