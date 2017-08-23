module.exports = {

  client: () => sails.hooks.twitch.client(),
  channel: () => sails.hooks.twitch.channel(),
  nickname: () => sails.hooks.twitch.nickname(),

  say (message) {
    this.client().say(this.channel(), message)
  },

  slowmode () {
    this.client().slow(this.channel(), 300)
  },

  slowmodeOff () {
    this.client().slowoff(this.channel())
  }

}