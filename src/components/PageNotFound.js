import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class PageNotFound extends Component {

  render() {
    const { authedUser } = this.props
    if(authedUser === null){
      return <Redirect to={{pathname:"/login", state:  {redirect:"/pagenotfound"}}} />
    }
    return (
      <div>
        <h3 className="center">404: Page Not Found</h3>
      </div>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  }
}

export default connect(mapStateToProps)(PageNotFound)