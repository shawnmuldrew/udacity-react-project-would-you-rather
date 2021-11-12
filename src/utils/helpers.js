export function formatQuestion (question, author, authedUser) {
  const { id, timestamp, optionOne, optionTwo } = question
  const { name, avatarURL } = author

  return {
    name,
    id,
    timestamp,
    optionOne,
    optionTwo,
    avatar: avatarURL,
    answered: optionOne.votes.includes(authedUser) || optionTwo.votes.includes(authedUser),
    optionOneCount: optionOne.votes.length,
    optionTwoCount: optionTwo.votes.length,
  }
}

export function formatUser (user) {
  const { id, name, avatarURL, questions, answers } = user
  return {
    id,
    name,
    avatar: avatarURL,
    answerCount: Object.keys(answers).length,
    questionCount: questions.length,
    totalCount: (Object.keys(answers).length + questions.length)
  }
}