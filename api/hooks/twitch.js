const _          = require('lodash')
const includeAll = require('include-all')
const Twitch     = require('tmi.js')
const path       = require('path')

module.exports = function twitch(sails) {

  this.test = "Hello!"

  sails.log.debug("Loading twitch hook...")

  var channel   = sails.config.twitch.channel
  var nickname  = sails.config.twitch.botNick
  var client    = new Twitch.client(sails.config.twitch)

  var pluginPath = path.join(sails.config.appPath, 'api', 'plugins')
  var plugins = includeAll({
    dirname     :  path.join(pluginPath, 'twitch'),
    filter      :  /(.+)\.js$/
  })
  
  // client.on('connected', (addr, port) => {
  //   sails.log.debug("connected to TMI")
  // })

  sails.on('discordMessage', (message) => {
    if (message.author.bot) return;
    client.say(channel, `[Discord] ${message.author.username} said: ${message.content}`)
  })

  client.on('join', (channel, username, self) => {
    sails.sockets.broadcast('twitchChannel', 'twitchJoin', { channel, username })
  })

  // TODO: send socket when user leaves/parts a channel.
  // client.on('part',)

  client.on('message', (channel, userstate, message, self) => {
    // ignore message from this bot...
    if (self) return;

    // Run the plugin functions.
    _.each(plugins, plugin => {
      plugin.message({
        channel, userstate, message, self, client
      })
    })
    
    sails.emit('twitchMessage', { channel, userstate, message, self })
    sails.sockets.broadcast('twitchChannel', 'twitchMessage', {
      channel, 
      userstate, 
      message, 
      is_bot: self
    })
  })

  // this.client.on('join', (channel, username, self) => {
  //   this.client.say(channel, `Welcome ${username}! I am a bot. Kappa`)
  // })

  client.connect()
  
  return {
    client: () => client,
    channel: () => channel,
    nickname: () => nickname,

    // TODO: More information..
    status: () => {
      return {
        status: client.readyState()
      }
    }
  }
};
