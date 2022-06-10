const INIT_PURPOSE = ['Chatting With Somebody', 'Group Chatting']

module.exports = {
  nameQuestion: `What's Your Name?\n`,

  welcomeMsg: username => {
    return `Hi ${username}! Let's Start Chatting.`
  },

  onConnectHint: `Now You Could Say "Room" To Start A Group Talk, Or Just Say A Friend's Name You Wanna Chat With.`,

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
    )}`
  },

  usersList: users => {
    return `These Friends Are Waiting For You To Chat With.\n${users.join(
      ' ,'
    )}\nPlease Choose One.`
  },

  noUserMsg: `Pity! There Is No Online Uses Right Now, Call Your Friends To Join The Chat!\nNow Shall We Try Group Chat First?`,

  talkToSomeone: username => {
    return `Congrats! ${username} Is Available Now, Let's Start Chatting.\n`
  }
}
