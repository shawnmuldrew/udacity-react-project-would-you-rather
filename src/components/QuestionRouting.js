import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionResult from './QuestionResult'
import QuestionPoll from './QuestionPoll'
import { formatQuestion } from '../utils/helpers'
import { Redirect } from 'react-router-dom'

class QuestionRouting extends Component {
  render() {
    if(this.props.authedUser === null){
      return <Redirect to={{pathname:"/login", state:  {redirect:`/question/${this.props.id}`}}} />
    }
    const { question } = this.props
    console.log(question)
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
  console.log(question)

  return {
    id,
    authedUser,
    question : question
      ? formatQuestion(question, users[question.author], authedUser)
      : null
  }
}

export default connect(mapStateToProps)(QuestionRouting)