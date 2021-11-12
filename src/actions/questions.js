import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import {showLoading, hideLoading} from 'react-redux-loading-bar'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_VOTE = 'ADD_VOTE'


function addQuestion(authedUser, question) {
  return {
    type: ADD_QUESTION,
    authedUser,
    question
  }
}

export function handleAddQuestion( optionOneText, optionTwoText ) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())
    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    })
    .then((question) => 
      dispatch(addQuestion(authedUser, question))
    )
    .then(() => dispatch(hideLoading()))
  }
}

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

function addVote ({ id, authedUser, poll }){
  return {
    type: ADD_VOTE,
    id,
    authedUser,
    poll,
  }
}

export function handleAddVote (info) {
  console.log('In handleAddVote')
  console.log(info)
  return (dispatch) => {
    dispatch(addVote(info))
    return saveQuestionAnswer({
      authedUser: info.authedUser, 
      qid: info.id, 
      answer: info.poll
    })
      .catch((e) => {
        console.warn('Error in handleAddVote: ',e)
        dispatch(addVote(info))
        alert('There was an error adding vote, try again')
      })
  }
}