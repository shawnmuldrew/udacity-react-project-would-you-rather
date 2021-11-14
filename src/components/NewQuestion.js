import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false,
  }
  handleChangeOne = (e) => {
    const text = e.target.value

    this.setState(() => ({
      optionOneText: text
    }))
  }

  handleChangeTwo = (e) => {
    const text = e.target.value

    this.setState(() => ({
      optionTwoText: text
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOneText, optionTwoText } = this.state
    const { dispatch } = this.props

    dispatch(handleAddQuestion(optionOneText, optionTwoText))

    this.setState(() => ({
      optionOneText: '',
      optionTwoText: '',
      toHome: true,
    }))
  }

  render() {
    if(this.props.authedUser === null){
      return <Redirect to={{pathname:"/login", state:  {redirect:"/new"}}} />
    }
    const { optionOneText, optionTwoText, toHome } = this.state
    console.log(this.state)
    if (toHome === true) {
      return <Redirect to='/' />
    }
    
    return (
      <div>
        <h3 className='center'>Create a New Question</h3>
        <form className='new-question' onSubmit={this.handleSubmit}>
          <p>Would you rather</p>
          <input type="text" id="optionOne" name="optionOne" placeholder="Enter Option One Text" value={optionOneText} onChange={this.handleChangeOne} maxLength={100}/>
          <p>OR</p>
          <input type="text" id="optionTwo" name="optionTwo" placeholder="Enter Option Two Text" value={optionTwoText} onChange={this.handleChangeTwo} maxLength={100}/>
          <button className="btn btn-primary" type="submit" disabled={optionOneText === '' || optionTwoText === ''}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps) (NewQuestion)