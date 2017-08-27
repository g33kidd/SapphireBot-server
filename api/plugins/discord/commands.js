module.exports = {
  events: {
    async message({ client, message }) {
      let created = await CommandService.addCommand(message.content, 'discord')
      if(created) {
        message.reply(`Created command ${created.signature}`)
      }

      let deleted = await CommandService.deleteCommand(message.content, 'discord')
      if(deleted.length > 0) {
        message.reply(`Deleted ${deleted.length} command: ${deleted[0].signature}`)
      }

      let updated = await CommandService.updateCommand(message.content, 'discord')
      if (updated) {
        console.log(updated)
        message.reply(`Updated command ${updated.signature}`)
      }

      let commands = await CommandService.findCommand(message.content, 'discord')
      commands.forEach(cmd => {
        if(message.content.startsWith(cmd.signature)) {
          message.channel.send(cmd.content)
        }
      })

      if(message.content.startsWith('!list')) {
        let commands = await CommandService.findCommand(message.content, 'discord')
        let str = commands.map(c => c.signature).join('\n')
        message.reply(`Available commands are:\n\`\`\`${str}\`\`\``)
      }
    }
  }
}