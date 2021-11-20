import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { withRouter } from 'react-router-dom'

class Login extends Component {

  state = {
    selectedUser: ''
  }
  handleSelectChange = (e) => {
    const selectedUser = e.target.value
    console.log(e.target.value)

    this.setState(() => ({
      selectedUser
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { selectedUser } = this.state
    const { dispatch } = this.props

    dispatch(setAuthedUser(selectedUser))

    this.setState(() => ({
      selectedUser: '',
    }))
    return this.props.history.push(this.props.location.state === undefined ? '/' : this.props.location.state.redirect);
    // return <Redirect to={{pathname:"/dashboard", state:  {redirect:"/login"}}} />
  }

  render() {
    const userList = Object.keys(this.props.users)
    return (
            <div className="question-list">
              <h3 className="center"> Sign In</h3>
              <div className="login">
                <div>      
                  <h3>Would You Rather?</h3><br />        
                    <div className="form-row">
                        <label>Sign In:</label>
                        <select defaultValue={'Select User'} className="form-control" name="userPick" onChange={this.handleSelectChange}>
                            <option disabled>Select User</option>
                            {userList.map((id) => (
                              <option key={id} value={id}>{id}</option>  
                            ))}
                        </select>
                  </div>
                  <div className="form-row">
                      <button type="submit" disabled={this.state.selectedUser === ''} className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
                  </div>
                </div>
              </div>
            </div>
    )
  }
}

function mapStateToProps({ users, authedUser }) {
  return {
    users,
    authedUser
  }
}

export default withRouter(connect(mapStateToProps)(Login))