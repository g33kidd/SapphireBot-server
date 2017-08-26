module.exports = {

  bots: (req, res) => {
    let discord = sails.hooks.discord.status()
    let twitch  = sails.hooks.twitch.status()

    return res.json({ discord, twitch })
  },

  async stream (req, res) {
    let channel = TwitchService.channel()
    let stream  = TwitchService.stream(channel._id)

    return res.json(stream)
  },

  subscribe: (req, res) => {
    if (!req.isSocket) return res.badRequest()
    sails.sockets.join(req, "status")
    return res.json({subscribed: true})
  }

}