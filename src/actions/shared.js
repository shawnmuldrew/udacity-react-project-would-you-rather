import { getInitialData } from "../utils/api";
import { setAuthedUser } from "./authedUser";
import { receiveQuestions } from "./questions";
import { receiveUsers } from "./users";

/* TODO: Build signed to set AUTHED USER */

const AUTHED_ID = 'sarahedo'

export function handleInitialData () {
  return (dispatch) => {
    return getInitialData()
      .then(({users, questions}) =>  {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(setAuthedUser(AUTHED_ID))
      })
  }
}