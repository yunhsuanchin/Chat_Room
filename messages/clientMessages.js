const INIT_PURPOSE = ['Chatting With Somebody', 'Group Chatting']

module.exports = {
  nameQuestion: `What's Your Name?\n`,

  welcomeMsg: username => {
    return `Hi ${username}! Let's Start Chatting.`
  },

  purposeQuestion: () => {
    const options = INIT_PURPOSE.map(
      (option, i) => `> ${String.fromCharCode(i + 65)}. ${option}`
    )

    return `What Do You Aiming For?\n${options.join('\n')}`
  },

  invalidWarningMsg: `Your Answer Was Too Ambiguous, Please Choose Again`,

  topicQuestion: topics => {
    return `Please Select a Topic You Are Interested In!\n> ${topics.join(
      ', '
    )} `
  },

  usersList: users => {
    const userList = users.map(
      user => user.username
    )`These Friends Are Waiting For You To Chat With.\n${userList.join(
      ' ,'
    )}\nPlease Choose One.`
  },

  noUserMsg: `Pity! There Is No Online Uses Right Now, Call Your Friends To Join The Chat!\nNow Shall We Try Group Chat First?`,

  matchingUser: `Your Friend Is Available Now, Let's Start Chatting.`
}
