import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

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
    const { dispatch, history } = this.props

    dispatch(setAuthedUser(selectedUser))

    this.setState(() => ({
      selectedUser: '',
    }))

    return history.push(this.props.location.state === undefined ? '/' : this.props.location.state.redirect);
  }

  render() {
    const userList = Object.keys(this.props.users)
    return (
              <div className="row">
                <div className="col-md-6 offset-md-3">      
                  <h3>Login to Would You Rather? Application</h3><br />        
                  <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Sign In:</label>
                        <select className="form-control" name="userPick" onChange={this.handleSelectChange}>
                            <option selected>Select User</option>
                            {userList.map((id) => (
                              <option key={id} value={id}>{id}</option>  
                            ))}
                        </select>
                    </div>
                  </div>

                <div className="form-row">
                      <div className="col-md-12 text-center">
                          <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
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

export default connect(mapStateToProps)(Login)