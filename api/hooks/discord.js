const Discord     = require('discord.js')
const hookUtils   = require('../utils/hookUtils')
const _           = require('lodash')
const formatUtils = require('../utils/formatUtils')

// TODO: Move all plugin loading to a helper module.

module.exports = function discord(sails) {

  const plugins = hookUtils.loadPlugins('discord')
  const client  = new Discord.Client()

  // TODO: Create stream if this is a new stream detected.
  // TODO: Announce if it's a new stream.
  sails.on('twitch:status', async (status) => {
    if (status) {
      await client.user.setPresence({ game: { name: status.channel.status, url: status.channel.url, type: 0 } })

      // Announcement doesn't work here... because it will be run every time the status check is run every 10000ms
      // let guild = client.guilds.first()
      // await guild.defaultChannel.send(`Woo! Now playing ${status.channel.status} at <${status.channel.url}>!`)
    } else {
      await client.user.setPresence({ game: { name: 'offline. Stream offline.', type: 0 } })
    }
  })

  sails.on('twitch:stream_created', async (status) => {
    let str = await SettingsService.getWithFormat('announce_stream_format', status)
    client.guilds.first().defaultChannel.send(str)
  })

  sails.on('twitch:stream_current_stoped', async (stream) => {
    client.guilds.first().defaultChannel.send("Stream has stopped..")
  })

  // TODO: Make it possible to make this a plugin. Currently unable to because
  // we need access to `twitchMessage` event.
  // We don't want to do this here. This can be a plugin itself.
  // sails.on('twitch:message', ({channel, userstate, message, self}) => {
  //   if (self) return;
  //   var channel = client.channels.find(val => val.id === '350002088723349514')
  //   channel.send(`[Twitch] **${userstate['display-name']}** said: ${message}`)
  // })

  client.on('disconnect', event => {
    sails.log.debug("Disconnected..")
    sails.sockets.broadcast('status', 'discord:status', { status: client.status })
  })

  client.on('reconnecting', event => {
    sails.log.debug("Reconnecting...")
    sails.sockets.broadcast('status', 'discord:status', { status: client.status })
  })

  client.on('message', async message => {
    if (message.author.bot) return;

    sails.emit('discord:message', message)
    _.each(plugins, p => p.events.message({ client, message }))
  })

  client.login(sails.config.discord.botToken)

  return {
    client: () => client,
    status: () => {
      return {
        status: client.status,
        uptime: client.uptime
      }
    }
  }
};
