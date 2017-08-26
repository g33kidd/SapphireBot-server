const _          = require('lodash')
const includeAll = require('include-all')
const Twitch     = require('tmi.js')
const path       = require('path')

module.exports = function twitch(sails) {

  const pluginPath  = path.join(sails.config.appPath, 'api', 'plugins')  

  // Load Discord plugins
  // Loads plugins that are in the format of `<Thing>Plugin.js` in the plugins folder.
  const filePlugins = includeAll({
    dirname: path.join(pluginPath),
    filter: /(.+Plugin)\.js$/,
    excludeDirs: /(discord|twitch)$/
  })

  // Loads plugins that are in the plugins/discord folder.
  const folderPlugins = includeAll({
    dirname: path.join(pluginPath, 'twitch'),
    filter: /(.+)\.js$/
  })

  const channel   = sails.config.twitch.channel
  const nickname  = sails.config.twitch.botNick
  const client    = new Twitch.client(sails.config.twitch)

  // Bind the events for each plugin to the `message` event from Discord.
  // TODO: Add more events.
  _.each(filePlugins, plugin => {
    if(plugin.service == 'twitch') {
      client.on('message', (channel, userstate, message, self) => {
        plugin.events.message({ channel, userstate, message, self, client })
      })
    } else if(plugin.service == null) {
      client.on('message', (channel, userstate, message, self) => {
        plugin.events.twitch.message({ channel, userstate, message, self, client })
      })
    }
  })

  // bind the events for folder plugins.
  _.each(folderPlugins, plugin => {
    client.on('message', (channel, userstate, message, self) => {
      plugin.events.message({ channel, userstate, message, self, client })
    })
  })

  // Poll for followers here?

  // For relaying chat messages from Discord to Twitch
  sails.on('discord:message', (message) => {
    if (message.author.bot) return;
    if (message.channel.id == '350002088723349514') {
      client.say(channel, `[Discord] ${message.author.username} said: ${message.content}`)
    }
  })

  // When somebody joins the twitch chat.
  client.on('join', (channel, username, self) => {
    // client.say(channel, `welcome ${username} Kappa`)
    sails.sockets.broadcast('twitch:channel', 'twitch:join', { channel, username })
  })

  client.on('disconnected', (reason) => {
    sails.sockets.broadcast('status', 'twitch:status', { reason })
  })

  client.on('reconnect', () => {
    sails.sockets.broadcast('status', 'twitch:status', {})
  })

  client.on('serverchange', () => {
    sails.sockets.broadcast('status', 'twitch:status', {})
  })

  // New message received..
  client.on('message', (channel, userstate, message, self) => {
    if (self) return;

    sails.emit('twitch:message', { channel, userstate, message, self })
    sails.sockets.broadcast('twitch:channel', 'twitch:message', {
      channel, 
      userstate, 
      message, 
      is_bot: self
    })
  })

  // Connect the client.
  client.connect()
  
  return {
    client: () => client,
    channel: () => channel,
    nickname: () => nickname,

    status: () => {
      return {
        status: client.readyState()
      }
    }
  }
};
