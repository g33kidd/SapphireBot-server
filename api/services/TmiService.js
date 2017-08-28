/**
 * Module for Twitch Messaging Interface stuff.
 * Anything here should be for interacting with TMIjs.
 * 
 * For other stuff that requires talking with the Twitch API, please see
 * the TwitchService.
 */

const axios = require('axios')
const api   = axios.create({
  baseURL: 'https://tmi.twitch.tv'
})

module.exports = {

  client: () => sails.hooks.twitch.client(),
  channel: () => sails.hooks.twitch.channel(),
  nickname: () => sails.hooks.twitch.nickname(),

  async shoutout (channel) {
    let data = await TwitchService.findChannel(channel)
    if (data) {
      this.say(`PogChamp Go checkout this stream! ${data.url} Last seen playing: ${data.game}`)
      return true
    } else {
      return false
    }
  },

  // Just gets all chatters in the room..
  // TODO: WTF WTF WTF
  async chatters (channel) {
    let res = await api.get(`group/user/${channel}/chatters`)
    return res.data
  },

  // TODO:
  async host (channel) {
    let res = await this.client.host(this.channel(), channel)
    return res.data
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