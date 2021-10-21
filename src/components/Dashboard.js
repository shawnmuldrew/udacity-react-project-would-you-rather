import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Dashboard extends Component {

  openTab = (e, questionType) => {
    // Declare all variables
    var i, tabcontent, tablinks;
    
    console.log(questionType)
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
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <div className="tab">
          <button className="tablinks" onClick={(e) => this.openTab(e, 'Unanswered')}>Unanswered Question</button>
          <button className="tablinks" onClick={(e) => this.openTab(e, 'Answered')}>Answered Questions</button>
        </div>
        <div id="Unanswered" className="tabcontent">
          {this.props.questionIds.map((id) => (
            <ul key={id}>
              <Question id={id} />
            </ul>
          ))}
        </div>
        <div id="Answered" className="tabcontent">
          <p>Nothing Answered</p>
        </div>
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