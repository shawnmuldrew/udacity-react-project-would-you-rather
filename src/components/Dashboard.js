import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Dashboard extends Component {

  /*
  openTab = (e, questionType) => {
    // Declare all variables
    let i, tabcontent, tablinks, questionElements;
    
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(questionType).style.display = "block";
    e.currentTarget.className += " active";

    // Show questions for current tab
    questionElements = document.getElementsByClassName("question")
    for (i = 0; i < questionElements.length; i ++) {
      if (questionType === 'Unanswered') {
        if  (questionElements[i].classList.contains('unanswered')) {
          questionElements[i].style.display = "grid"
        } else {
          questionElements[i].style.display = "none"
        }
      } else {
        if  (questionElements[i].classList.contains('unanswered')) {
        questionElements[i].style.display = "none"
        } else {
        questionElements[i].style.display = "grid"
        }
      }
    }
  }
  */

  /*
         <div className="tab">
          <button id="unansweredTab" className="tablinks" onClick={(e) => this.openTab(e, 'Unanswered')}>Unanswered Question</button>
          <button id="answeredTab" className="tablinks" onClick={(e) => this.openTab(e, 'Answered')}>Answered Questions</button>
        </div>
 
  */
  render() {
    const userAnsweredIds = Object.keys(this.props.users[this.props.authedUser].answers)
    const userUnansweredIds = this.props.questionIds.filter(qid => !userAnsweredIds.includes(qid))
    return (
      <div className="question-list">
        <div id="Unanswered" className="tabcontent">
        <h3 className="center">Unanswered Questions</h3>
          {userUnansweredIds.map((id) => (
            <ul key={id}>
              <Question id={id} />
            </ul>
          ))}
        </div>
        <div id="Answered" className="tabcontent">
        <h3 className="center">Answered Questions</h3>
        {userAnsweredIds.map((id) => (
            <ul key={id}>
              <Question id={id} />
            </ul>
          ))}
        </div>
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