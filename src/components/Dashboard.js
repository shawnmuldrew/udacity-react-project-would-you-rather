import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { Redirect } from 'react-router-dom'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'


class Dashboard extends Component {

  sortQuestionsByDate = (questionIds, questions) => {
    return questionIds.sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  }

  render() {
    const { authedUser, questions, users } = this.props
    if(authedUser === null){
      return <Redirect to={{pathname:"/login", state:  {redirect:"/"}}} />
    }
    const userAnsweredIds = this.sortQuestionsByDate(Object.keys(users[authedUser].answers),questions)
    const userUnansweredIds = this.sortQuestionsByDate(Object.keys(questions).filter(qid => !userAnsweredIds.includes(qid)),questions)
    return (
      <Tabs
        defaultActiveKey="unanswered"
        transition={false}
        className="mb-3"
      >
        <Tab eventKey="unanswered" title="Unanswered">
          <div className="question-list">
            <h3 className="center">Unanswered Questions</h3>
              {userUnansweredIds.map((id) => (
                <ul key={id}>
                  <Question id={id} />
                </ul>
              ))}
            </div>
        </Tab>
        <Tab eventKey="answered" title="Answered">
          <div className="question-list">
            <h3 className="center">Answered Questions</h3>
            {userAnsweredIds.map((id) => (
                <ul key={id}>
                  <Question id={id} />
                </ul>
              ))}
          </div>
        </Tab>
      </Tabs>
    )
  }
}

function mapStateToProps({ questions, users, authedUser }) {
  return {
    questions,
    users,
    authedUser,
  }
}

export default connect(mapStateToProps)(Dashboard)