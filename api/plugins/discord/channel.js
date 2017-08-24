// TODO: Something similar to this...
const Discord = require('discord.js')

module.exports = {

  message: ({ client, message }) => {
    if (message.author.bot) return;

    if (message.content === '!twitch') {
      const embed = new Discord.RichEmbed()
      
      TwitchService.channel().then(channel => {
        console.log(channel)
        embed.setTitle(channel.status)
             .setAuthor(channel.display_name, channel.logo, channel.url)
             .setColor(channel.profile_banner_background_color)
             .addField('Total Views', channel.views, true)
             .addField('Followers', channel.followers, true)

        TwitchService.stream(channel._id).then(stream => {

          console.log(stream)
          if (stream != null) {
            embed.setImage(stream.preview.large)         
                 .setDescription(`Currently streaming in ${stream.game}.`) 
                 .addField('Viewers', stream.viewers, true)
          } else {
            embed.setImage(channel.video_banner)
                 .setDescription(`Currently offline. Last seen playing ${channel.game}`)
          }

          message.channel.send({ embed });
        })
      })
    }
  }

}