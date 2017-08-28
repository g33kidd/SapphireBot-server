module.exports = {

  events: {
    async message ({ message }) {
      // Make configurable.
      if(message.author.id !== '117046039277469696') return;

      let chan         = await TwitchService.channel()      
      let titleCommand = CommandService.parse('!title', message.content, ['status'])
      let gameCommand  = CommandService.parse('!game', message.content, ['game'])

      if (titleCommand.valid) {
        try {
          await TwitchService.updateChannel(chan._id, {status: titleCommand.status})
          message.reply(`Okay. I've updated the channel status to **${titleCommand.status}**`)
        } catch (err) {
          message.reply(`Whoops... there was an error: ${err}`)
        }
      }

      if (gameCommand.valid) {
        try {
          await TwitchService.updateChannel(chan._id, {game: gameCommand.game})
          message.reply(`Okay. I've updated the channel game to **${gameCommand.game}**`)
        } catch (err) {
          message.reply(`Whoops... there was an error: ${err}`)
        }
      }
    }
  }


}