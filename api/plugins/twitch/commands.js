module.exports = {
  events: {
    async message({channel, userstate, message}) {
      await CommandService.addCommand(message, 'twitch')
      await CommandService.deleteCommand(message, 'twitch')
      await CommandService.updateCommand(message, 'twitch')

      let commands = await CommandService.findCommand(message, 'twitch')
      commands.forEach(cmd => {
        if(message.startsWith(cmd.signature)) {
          TmiService.say(cmd.content)
        }
      })
    }
  }
}