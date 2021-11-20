import React, {Component, Fragment} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import NewQuestion from './NewQuestion'
import QuestionRouting from './QuestionRouting'
import LeaderBoard from './LeaderBoard'
import Login from './Login'
import Logout from './Logout'
import PageNotFound from './PageNotFound'
import NavComp from './NavComp'
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
            <NavComp/>
            {this.props.loading === true
              ? null
              : <div>
                  <Switch>
                    <Route path='/' exact component={Dashboard} />
                    <Route path='/login' exact component={Login} />
                    <Route path= '/question/:id' exact component={QuestionRouting} />
                    <Route path='/add' exact component={NewQuestion} />
                    <Route path='/leaderboard' exact component={LeaderBoard} />
                    <Route path='/logout' exact component={Logout} />
                    <Route path='/pagenotfound' exact component={PageNotFound} />
                    <Route path='/' component={PageNotFound}/>
                  </Switch>
                </div>
            } 
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ questions, authedUser }) {
  return {
    loading: questions === null,
    authedUser
  }
}

export default connect(mapStateToProps)(App);
