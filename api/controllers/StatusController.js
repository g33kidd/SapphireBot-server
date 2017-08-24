module.exports = {

  bots: (req, res) => {
    let discord = sails.hooks.discord.status()
    let twitch  = sails.hooks.twitch.status()

    return res.json({ discord, twitch })
  },

  stream: (req, res) => {
    TwitchService.channel().then(channel => {
      TwitchService.stream(channel._id).then(stream => {
        return res.json({ stream })
      })
    })
  }

}