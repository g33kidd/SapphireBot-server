module.exports = {

  events: {
    async message ({ message }) {
      // Make configurable.
      if(message.author.id !== '117046039277469696') return;

      let chan         = await TwitchService.channel()      
      let titleCommand = CommandService.parse('!title', message.content, ['status'])
      let gameCommand  = CommandService.parse('!game', message.content, ['game'])

      try {
        if (titleCommand.valid) {
          await TwitchService.updateChannel(chan._id, {status: titleCommand.status})
          message.reply(`Okay. I've updated channel status to **${titleCommand.status}**`)
        } else if (gameCommand.valid) {
          await TwitchService.updateChannel(chan._id, {game: gameCommand.game})
          message.reply(`Okay. I've updated the channel game to **${gameCommand.game}**`)
        }
      } catch(err) {
        message.reply(`Whoops... there was an error: ${err}`)
      }
    }
  }


}