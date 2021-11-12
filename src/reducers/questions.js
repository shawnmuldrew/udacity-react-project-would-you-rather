import { RECEIVE_QUESTIONS, ADD_QUESTION, ADD_VOTE } from "../actions/questions";

export default function questions (state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
    case ADD_QUESTION :
      return {
        ...state,
        [action.question.id]: action.question 
      }
    case ADD_VOTE :
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          [action.poll]: {
            ...state[action.id][action.poll],
            'votes': [
              ...state[action.id][action.poll]['votes'], action.authedUser
            ]
          }
        }
      }        

    default :
      return state
  }
}