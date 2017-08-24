const Discord     = require('discord.js')
const path        = require('path')
const includeAll  = require('include-all')
const _           = require('lodash')

// TODO: make the channel id configurable.

module.exports = function discord(sails) {

  sails.log.debug("Loading discord hook...")
  var client = new Discord.Client()

  var pluginPath = path.join(sails.config.appPath, 'api', 'plugins')
  var plugins = includeAll({
    dirname     :  path.join(pluginPath, 'discord'),
    filter      :  /(.+)\.js$/
  })

  sails.on('twitchMessage', ({channel, userstate, message, self}) => {
    if (self) return;
    var channel = client.channels.find(val => val.id === '350002088723349514')
    channel.send(`[**Twitch**] **${userstate['display-name']}** said: ${message}`)
  })

  client.on('message', message => {
    _.each(plugins, plugin => {
      plugin.message({ client, message })
    })

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
