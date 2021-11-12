import React, {Component, Fragment} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import NewQuestion from './NewQuestion'
import QuestionRouting from './QuestionRouting'
import LeaderBoard from './LeaderBoard'
import Nav from './Nav'
import { LoadingBar } from 'react-redux-loading-bar'


class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar/>
          <div className='container'>
            <Nav/>
            {this.props.loading === true
              ? null
              : <div>
                  <Route path="/" exact component={Dashboard} />
                  <Route path = '/question/:id' exact component={QuestionRouting} />
                  <Route path="/new" exact component={NewQuestion} />
                  <Route path="/leaderboard" exact component={LeaderBoard} />
                </div>
            } 
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App);
