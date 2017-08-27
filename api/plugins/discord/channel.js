// TODO: Something similar to this...
const Discord = require('discord.js')

module.exports = {

  events: {
    async message ({ client, message }) {

      // TODO: Should we ignore self messages by default? Or let the user handle that?
      if (message.author.bot) return;
      if (message.content === '!twitch') {
        const embed = new Discord.RichEmbed()

        let channel = await TwitchService.channel()
        let stream  = await TwitchService.stream(channel._id)
        
        embed.setTitle(channel.status)
              .setAuthor(channel.display_name, channel.logo, channel.url)
              .setColor(channel.profile_banner_background_color)
              .addField('Total Views', channel.views, true)
              .addField('Followers', channel.followers, true)

        if (stream != null) {
          embed.addField('Viewers', stream.viewers, true)
                .setImage(stream.preview.large)         
                .setDescription(`Currently streaming in ${stream.game}.`) 
        } else {
          embed.setImage(channel.video_banner)
                .setDescription(`Currently offline. Last seen playing ${channel.game}`)
        }

        message.channel.send({ embed })
      }
    }
  }

}