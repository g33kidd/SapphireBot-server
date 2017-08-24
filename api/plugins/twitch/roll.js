module.exports = {
  message: ({channel, userstate, message, self, client}) => {
    if (self) return;
    // Do stuff here...
    // client.say(channel, message)
  }
}