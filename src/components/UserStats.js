import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatUser } from '../utils/helpers'
import { withRouter } from 'react-router-dom'

class UserStats extends Component {

  render() {
    const { user } = this.props
    const { avatar, name, answerCount, questionCount, totalCount } = user
    return (
      <div className="question">
        <div className="question-header">
          <p>{name}</p>     
        </div> 
        <div className="question-body">
          <div className="column1">
            <img
              src = {avatar}
              alt = {`Avatar of ${name}`}
              className = 'avatar'
            /> 
          </div>
          <div className="column2">
            <div className="leader-total">Total: {totalCount}</div>
            <div className="leader-count">Answered: {answerCount}</div>
            <div className="leader-count">Created: {questionCount}</div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({users, authedUser}, { id }) {
  const user = users[id]

  return {
    authedUser,
    user : user
      ? formatUser(user)
      : null
  }
}

export default withRouter(connect(mapStateToProps)(UserStats))