import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserStats from './UserStats'

class LeaderBoard extends Component {

  sortUsers = (users) => {
    const userIdList = Object.keys(users).sort((a, b) => (
      (users[b].questions.length + Object.keys(users[b].answers).length) -
      (users[a].questions.length + Object.keys(users[a].answers).length)
    ))
    return userIdList
  }

  render() {
    // const users = Object.keys(this.props.users)
    const userIdList = this.sortUsers(this.props.users)
    return (
      <div className="question-list">
        <h3 className="center">Leader Board</h3>
        {userIdList.map((id) => (
          <ul key={id}>
            <UserStats id={id} />
          </ul>
        ))}
      </div>
    )
  }
}

function mapStateToProps({ users, authedUser }) {
  return {
    users,
    authedUser
  }
}

export default connect(mapStateToProps)(LeaderBoard)