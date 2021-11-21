import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionResult from './QuestionResult'
import QuestionPoll from './QuestionPoll'
import { formatQuestion } from '../utils/helpers'
import { Redirect } from 'react-router-dom'

class QuestionRouting extends Component {
  render() {
    const { id, authedUser, question, invalidQuestionURL } = this.props
    if(authedUser === null){
      return <Redirect to={{pathname:"/login", state:  {redirect:`/question/${id}`}}} />
    }
    if (invalidQuestionURL) {
      return <Redirect to = "/pagenotfound" />
    }
    return (
      <div>
          {question.answered ?
            <QuestionResult id={question.id}/>
          :
            <QuestionPoll id={question.id}/>
        }
      </div>
    )
  }
}

function mapStateToProps({authedUser, users, questions}, props) {
  const { id } = props.match.params
  const question = questions[id]

  return {
    id,
    authedUser,
    invalidQuestionURL: question === undefined,
    question : question
      ? formatQuestion(question, users[question.author], authedUser)
      : null
  }
}

export default connect(mapStateToProps)(QuestionRouting)