module.exports = {
  service: null,

  events: {
    twitch: {
      message ({ message }) {
        CommandService.addcom(message, 'twitch')
      }
    },
    discord: {
      message (msg) {
        // CommandService.addcom(msg, 'discord')
      }
    }
  }
}