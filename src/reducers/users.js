import { RECEIVE_USERS } from "../actions/users";
import { ADD_QUESTION, ADD_VOTE } from "../actions/questions";

export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }
    case ADD_QUESTION :
      console.log('In add question for users')
      console.log(action)
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          questions: state[action.authedUser].questions.concat([action.question.id])
        }
      }
    case ADD_VOTE :
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
          ...state[action.authedUser].answers, [action.id]: action.poll
          }
        }
      }
    default :
      return state
  }
}