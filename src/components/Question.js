import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'

class Question extends Component {
  render() {
    console.log(this.props)
    const { question } = this.props
    const { author, avatar, name, optionOne, optionTwo } = question 
    return (
      <div className="question">
        <div className="question-header">
          <p>{name} asks:</p>
          
        </div> 
        <img
          src = {avatar}
          alt = {`Avatar of ${name}`}
          className = 'avatar'
        /> 
        <div className="question-body">
          <div className="card-title">Would you rather</div>
          <div className="question-text">{optionOne.text}</div>
          <div className="question-text">{optionTwo.text}</div>
        </div>
        <div className="view-poll-button">
            <a href="#" className="btn btn-primary">View Poll</a>
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