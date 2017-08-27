const Twitch     = require('tmi.js')
const hookUtils  = require('../utils/hookUtils.js')
const _          = require('lodash')

// TODO: Move all event stuff into plugins. Just bind all these events.

module.exports = function twitch(sails) {

  const plugins   = hookUtils.loadPlugins('twitch')
  const channel   = sails.config.twitch.channel
  const nickname  = sails.config.twitch.botNick
  const client    = new Twitch.client(sails.config.twitch)

  // TODO: Look over this one again sometime...
  // NOTE: This could be nice for specific events where we don't care
  // about the parameters and just give the plugin function everything.
  // const events = [
  //   'join',
  //   'disconnected',
  //   'reconnect'
  // ]

  // _.each(events, e => {
  //   _.each(plugins, p => {
  //     let isValidService = (p.service === 'twitch' || p.service === null)
  //     if (p.events[e] && isValidService) {
  //       client.on(e, p.events[e])
  //     }
  //   })
  // })

  // sails.on('discord:message', (message) => {
  //   if (message.author.bot) return;
  //   if (message.channel.id == '350002088723349514') {
  //     client.say(channel, `[Discord] ${message.author.username} said: ${message.content}`)
  //   }
  // })

  // When somebody joins the twitch chat.
  client.on('join', (channel, username, self) => {
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

  client.on('message', (channel, userstate, message, self) => {
    if (self) return;
    
    let params = {channel, userstate, message}

    _.each(plugins, p => p.events.message(params))
    sails.emit('twitch:message', params)
    sails.sockets.broadcast('twitch:channel', 'twitch:message', params)
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
