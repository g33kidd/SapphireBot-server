module.exports = {

  slowmode: (req, res) => {
    TmiService.slowmodeOff()
  },

  followers: (req, res) => {
    let followerList = TwitchService.followers()
    return res.json(followerList)
  },

  subscribers: (req, res) => {
    let subscriberList = TwitchService.subscribers()
    return res.json(subscriberList)
  },

  liveStats: (req, res) => {
    let stats = TwitchService.liveStats()
    return res.json(stats)
  },

  stats: (req, res) => {
    let stats = TwitchService.stats()
    return res.json(stats)
  },

  subscribe: (req, res) => {
    if (!req.isSocket) return res.badRequest()
    sails.sockets.join(req, "twitchChannel")
    return res.json({subscribed: true})
  },

  // Sends chat a message to checkout some other channel.
  shoutout: (req, res) => {
    TmiService.shoutout(req.param('channel')).then(sent => {
      return res.json({sent})
    })
  }
}
