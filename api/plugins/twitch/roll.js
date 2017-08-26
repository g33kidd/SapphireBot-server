module.exports = {
  events: {
    message: ({channel, userstate, message, self, client}) => {
      if (self) return;
      // Do stuff here...
      // client.say(channel, message)
    }
  }
}