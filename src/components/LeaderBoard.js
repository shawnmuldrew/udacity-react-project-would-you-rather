import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserStats from './UserStats'
import { Redirect } from 'react-router-dom'

class LeaderBoard extends Component {

  sortUsers = (users) => {
    const userIdList = Object.keys(users).sort((a, b) => (
      (users[b].questions.length + Object.keys(users[b].answers).length) -
      (users[a].questions.length + Object.keys(users[a].answers).length)
    ))
    return userIdList
  }

  render() {
    const { users, authedUser } = this.props
    if(authedUser === null){
      return <Redirect to={{pathname:"/login", state:  {redirect:"/leaderboard"}}} />
    }
    const userIdList = this.sortUsers(users)
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