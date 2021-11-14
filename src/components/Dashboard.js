import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {

  render() {
    if(this.props.authedUser === null){
      return <Redirect to={{pathname:"/login", state:  {redirect:"/dashboard"}}} />
    }
    const userAnsweredIds = Object.keys(this.props.users[this.props.authedUser].answers)
    const userUnansweredIds = this.props.questionIds.filter(qid => !userAnsweredIds.includes(qid))
    return (
      <div className="question-list">
        <h3 className="center">Unanswered Questions</h3>
          {userUnansweredIds.map((id) => (
            <ul key={id}>
              <Question id={id} />
            </ul>
          ))}
        <h3 className="center">Answered Questions</h3>
        {userAnsweredIds.map((id) => (
            <ul key={id}>
              <Question id={id} />
            </ul>
          ))}
      </div>
    )
  }
}

function mapStateToProps({ questions, users, authedUser }) {
  return {
    questionIds: Object.keys(questions).sort((a,b) => questions[b].author - questions[a].author),
    questions,
    users,
    authedUser
  }
}

export default connect(mapStateToProps)(Dashboard)