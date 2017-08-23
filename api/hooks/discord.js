const Discord = require('discord.js')

module.exports = function discord(sails) {

  var client =  new Discord.Client()

  sails.on('twitchMessage', ({channel, userstate, message, self}) => {
    if (self) return;
    // TODO: make this channel id configurable.
    var channel = client.channels.find(val => val.id === '350002088723349514')
    channel.send(`[**Twitch**] **${userstate['display-name']}** said: ${message}`)
  })

  client.on('message', message => {
    // TODO: make this channel id configurable.
    // NOTE: It won't let us send long messages like this I guess...
    // sails.sockets.broadcast('discordServer', 'discordMessage', { message })
    if (message.channel.id == '350002088723349514') {
      sails.emit('discordMessage', message)
    }
  })

  client.login(sails.config.discord.botToken)

  // Functions here should be helper methods for DiscordJS
  return {
    client: () => client
  }
};
