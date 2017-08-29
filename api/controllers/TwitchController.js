module.exports = {
  // TODO: How the heck do I list routes in a sails project `sails list routes` ?

  // TODO: ORRRR... toggle
  async slowmode (req, res) {
    TmiService.slowmodeOff()
  },

  async followers (req, res) {
    let followerList = await TwitchService.followers()
    return res.json(followerList)
  },

  async streams (req, res) {
    let streams = await Stream.find()
    return res.json(streams)
  },

  async chatters (req, res) {
    let chatters = await TmiService.chatters()
    console.log(chatters)
    return res.json(chatters)
  },

  async subscribers (req, res) {
    let subscriberList = await TwitchService.subscribers()
    return res.json(subscriberList)
  },

  async live (req, res) {
    let channel = await TwitchService.channel()
    let stream  = await TwitchService.stream(channel._id)
    return res.json(stream)
  },

  async updateChannel (req, res) {
    let channel = await TwitchService.channel()
    let updateResp = await TwitchService.updateChannel(channel._id, req.body)

    return res.ok()
  },

  async stats (req, res) {
    let stats = await TwitchService.stats()
    return res.json(stats)
  },

  async subscribe (req, res) {
    if (!req.isSocket) return res.badRequest()
    sails.sockets.join(req, "twitch:channel")
    return res.json({subscribed: true})
  },

  // Sends chat a message to checkout some other channel.
  async shoutout (req, res) {
    try {
      await TmiService.shoutout(req.param('channel'))
      await DiscordService.shoutout(req.param('channel'))

      if (req.param('with_host')) {
        await TmiService.host(req.param('channel'))
      }

      return res.ok()
    } catch(err) {
      return res.serverError(err)
    }
  }
}
