module.exports = {

  client: () => sails.hooks.discord.client(),

  async shoutout (channel) {
    let data = await TwitchService.findChannel(channel)

    if (data) {
      let stream = await TwitchService.live(data._id)

      if (stream) {
        let str = await SettingsService.getWithFormat('discord_shoutout_live_format', stream)
        this.client().guilds.first().defaultChannel.send(str)
      } else {
        let str = await SettingsService.getWithFormat('discord_shoutout_offline_format', data)
        this.client().guilds.first().defaultChannel.send(str)
      }
    }
  },
}
