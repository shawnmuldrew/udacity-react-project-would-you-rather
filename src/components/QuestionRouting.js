import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionResult from './QuestionResult'
import QuestionPoll from './QuestionPoll'
import { formatQuestion } from '../utils/helpers'

class QuestionRouting extends Component {
  render() {
    const { question } = this.props
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
  const {id} = props.match.params
  const question = questions[id]
  console.log(id)

  return {
    authedUser,
    question : question
      ? formatQuestion(question, users[question.author], authedUser)
      : null
  }
}

export default connect(mapStateToProps)(QuestionRouting)