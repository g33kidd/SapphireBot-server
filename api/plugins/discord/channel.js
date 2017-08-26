// TODO: Something similar to this...
const Discord = require('discord.js')

module.exports = {

  events: {
    message ({ client, msg }) {

      // TODO: Should we ignore self messages by default? Or let the user handle that?
      if (msg.author.bot) return;
      if (msg.content === '!twitch') {
        const embed = new Discord.RichEmbed()
        
        TwitchService.channel().then(channel => {
          embed.setTitle(channel.status)
               .setAuthor(channel.display_name, channel.logo, channel.url)
               .setColor(channel.profile_banner_background_color)
               .addField('Total Views', channel.views, true)
               .addField('Followers', channel.followers, true)
  
          TwitchService.stream(channel._id).then(stream => {
            if (stream != null) {
              embed.addField('Viewers', stream.viewers, true)
                   .setImage(stream.preview.large)         
                   .setDescription(`Currently streaming in ${stream.game}.`) 
            } else {
              embed.setImage(channel.video_banner)
                   .setDescription(`Currently offline. Last seen playing ${channel.game}`)
            }
  
            msg.channel.send({ embed });
          })
        })
      }
    }
  }

}