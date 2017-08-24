/**
 * Module for Twitch Messaging Interface stuff.
 * Anything here should be for interacting with TMIjs.
 * 
 * For other stuff that requires talking with the Twitch API, please see
 * the TwitchService.
 */

module.exports = {

  client: () => sails.hooks.twitch.client(),
  channel: () => sails.hooks.twitch.channel(),
  nickname: () => sails.hooks.twitch.nickname(),

  shoutout (channel) {
    return TwitchService.findChannel(channel).then(data => {
      if (typeof(data) != 'undefined') {
        this.say(`PogChamp Go checkout this stream! ${data.url} Last seen playing: ${data.game}`)
        return true
      } else {
        return false
      }
    })
  },

  say (message) {
    this.client().say(this.channel(), message)
  },

  chatters () {},

  enableSlowmode (sec = 100) {},
  disableSlowmode () {},

  mod(user) {},
  unmod(user) {},

  promote(user) {},
  demote(user) {}

}