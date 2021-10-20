import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Dashboard extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <h3>Questions</h3>
          {this.props.questionIds.map((id) => (
              <Question id={id} />
          ))}
      </div>
    )
  }
}

function mapStateToProps({ questions }) {
  return {
    questionIds: Object.keys(questions)
      .sort((a,b) => questions[b].author - questions[a].author)
  }
}

export default connect(mapStateToProps)(Dashboard)