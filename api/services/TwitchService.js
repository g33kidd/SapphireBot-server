const axios = require('axios')

// TODO: Implement auth flow for twitch. Instead of setting it this way..
// TODO: put this in a service? or hook?
const api   = axios.create({
  baseURL: 'https://api.twitch.tv/kraken/',
  headers: {
    'Accept': 'application/vnd.twitchtv.v5+json',
    'Client-ID': sails.config.twitch.clientId,
    'Authorization': `OAuth ${sails.config.twitch.oauth}`
  }
})

module.exports = {

  async channel () {
    let res = await api.get('channel')
    return res.data
  },

  async stream (id) {
    let res = await api.get(`streams/${id}`)
    return res.data.stream
  },

  async searchChannels (query) {
    let res = await api.get('search/channels', { params: { query: query } })
    return res.data
  },

  async live(id) {
    if(id) {
      let stream = this.stream(id)
      return stream
    } else {
      let chan = await this.channel()
      let stream = await this.stream(chan._id)
      return stream
    }

  },

  async findChannel (name) {
    let search = await this.searchChannels(name)
    return search.channels.find(c => c.name === name)
  },

  async followers (id) {
    let res = await api.get(`channels/${id}/follows`)
    return res.data
  },

  async subscribers (id) {
    let res = await api.get(`channels/${id}/subscriptions`)
    return res.data
  },

  // NOTE: This gives a Timeout error because of Axios for some reason???
  // Only happens sometimes ¯\_(ツ)_/¯ pls fix...
  async updateChannel (id, channel) {
    let res = await api.put(`channels/${id}`, { channel })
    return res.data
  }

}
