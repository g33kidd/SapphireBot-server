module.exports = {

  slowmode: (req, res) => {
    TwitchService.slowmodeOff()
  },

  followers: (req, res) => {},
  subscribers: (req, res) => {},

  subscribe: (req, res) => {
    if (!req.isSocket) return res.badRequest()
    sails.sockets.join(req, "twitchChannel")
    return res.json({ subscribed: true })
  },

  shoutout: (req, res) => {}

}
