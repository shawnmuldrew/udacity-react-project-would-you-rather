import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { handleAddVote} from '../actions/questions'
import { Redirect } from 'react-router-dom'

class QuestionPoll extends Component {

  state = {
    poll: '',
    toHome: false,
  }

  setOption = (e) => {
    const { value } = e.target
    this.setState(() => ({
      poll: value
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { poll } = this.state
    const { dispatch, id, authedUser } = this.props

    dispatch(handleAddVote({id, authedUser, poll}))

    this.setState(() => ({
      poll: '',
      toHome: true,
    }))
  }

  render() {
    const { question } = this.props
    const { avatar, name, optionOne, optionTwo } = question 
    const { toHome } = this.state

    if (toHome === true) {
      return <Redirect to={`/question/${question.id}`} />
    }
    
    return (
      <div className="question-list">
        <h3 className="center">Answer Poll</h3>
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
              <div className="question-title">Would you rather</div>
              <div>
                <div className="question-text">
                  <input type="radio" id="optionOne" name="poll" value="optionOne" onChange={this.setOption} 
                         checked={this.state.poll === null ? false : this.state.poll ===  "optionOne"}/>
                  {optionOne.text}
                </div>
                <div className="question-text">
                  <input type="radio" id="optionTwo" name="poll" value="optionTwo" onChange={this.setOption} 
                         checked={this.state.poll === null ? false : this.state.poll ===  "optionTwo"}/>
                  {optionTwo.text}
                </div>
              </div>
            </div>
          </div>
          <div className="view-poll-button">
            <button className="btn btn-primary" disabled={this.state.poll === ''} type="submit" onClick={this.handleSubmit}>Submit</button>
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

export default connect(mapStateToProps)(QuestionPoll)