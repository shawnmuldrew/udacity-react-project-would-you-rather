import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'

class Question extends Component {
  render() {
    const { question } = this.props
    const { avatar, name, optionOne, optionTwo } = question 
    return (
      <div className={`question ${question.answered ? 'answered' : 'unanswered'}`}>
        <div className="question-header">
          <p>{name} asks:</p>     
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
            <div className="question-title">Would you rather</div>
            <div className="question-text">{optionOne.text}</div>
            <div className="question-text">{optionTwo.text}</div>
            <div className="view-poll-button">
            <button className="btn btn-primary" type="submit" >View Poll</button>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

function mapStateToProps({authedUser, users, questions}, { id }) {
  const question = questions[id]

  return {
    authedUser,
    question : question
      ? formatQuestion(question, users[question.author], authedUser)
      : null
  }
}

export default connect(mapStateToProps)(Question)