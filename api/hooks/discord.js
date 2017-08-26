const Discord     = require('discord.js')
const path        = require('path')
const includeAll  = require('include-all')
const _           = require('lodash')

// TODO: Move all plugin loading to a helper module.

module.exports = function discord(sails) {

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
    dirname: path.join(pluginPath, 'discord'),
    filter: /(.+)\.js$/
  })

  // Create the Discord client
  const client = new Discord.Client()

  // Bind the events for each plugin to the `message` event from Discord.
  // TODO: Add more events.
  // TODO: Clean this up again...
  _.each(filePlugins, plugin => {
    if(plugin.service == 'discord') {
      client.on('message', msg => plugin.events.message({ client, msg }))    
    } else if(plugin.service == null) {
      client.on('message', msg => plugin.events.discord.message({ client, msg }))
    }
  })

  // bind the events for folder plugins.
  _.each(folderPlugins, plugin => {
    client.on('message', msg => plugin.events.message({ client, msg }))
  })

  // TODO: Make it possible to make this a plugin. Currently unable to because
  // we need access to `twitchMessage` event.
  // We don't want to do this here. This can be a plugin itself.
  sails.on('twitch:message', ({channel, userstate, message, self}) => {
    if (self) return;
    var channel = client.channels.find(val => val.id === '350002088723349514')
    channel.send(`[Twitch] **${userstate['display-name']}** said: ${message}`)
  })

  client.on('disconnect', event => {
    sails.log.debug("Disconnected..")
    sails.sockets.broadcast('status', 'discord:status', { status: client.status })
  })

  client.on('reconnecting', event => {
    sails.log.debug("Reconnecting...")
    sails.sockets.broadcast('status', 'discord:status', { status: client.status })
  })

  client.on('message', message => sails.emit('discord:message', message))

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
