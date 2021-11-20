import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import ProgressBar from 'react-bootstrap/ProgressBar'

class QuestionResult extends Component {

  render() {
    const { question, authedUser } = this.props
    const { avatar, name, optionOne, optionTwo, optionOneCount, optionTwoCount } = question 
    const totalVotes = optionOneCount + optionTwoCount
    const optionOnePercent = Math.round(optionOneCount/totalVotes*100)
    const optionTwoPercent = Math.round(optionTwoCount/totalVotes*100)
    
    return (
      <div className="question-list">
        <h3 className="center">Poll Results</h3>
        <div className="question">
          <div className="question-header">
            <p>Question from {name}</p>     
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
              <div className="question-title">Results</div>
              <div>
                <div className="question-results">
                  <div className="question-text">{optionOne.text}</div>
                  <div className="poll-ratio">{optionOneCount} out of {totalVotes}</div>
                  <ProgressBar now={optionOnePercent} label={`${optionOnePercent}%`} />
                  {optionOne.votes.includes(authedUser) ? <p>You picked this one!</p> : null}
                </div>
                <div className="question-results">
                  <div className="question-text">{optionTwo.text}</div>
                  <div className="poll-ratio">{optionTwoCount} out of {totalVotes}</div>
                  <ProgressBar now={optionTwoPercent} label={`${optionTwoPercent}%`} />
                  {optionTwo.votes.includes(authedUser) ? <p>You picked this one!</p> : null}
                </div>
              </div>
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

export default connect(mapStateToProps)(QuestionResult)