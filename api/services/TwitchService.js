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

  channel () {
    return api.get('channel')
      .then(res => res.data)
  },

  stream (id) {
    return api.get(`streams/${id}`)
      .then(res => res.data.stream)
  },

  searchChannels (query) {
    return api.get('search/channels', { params: { query: query } })
      .then(res => res.data)
  },

  findChannel (name) {
    return this.searchChannels(name)
      .then(data => data.channels.find(c => c.name === name))
  },

  followers (id) {
    return api.get(`channels/${id}/follows`)
      .then(res => res.data)
  },

  subscribers (id) {
    return api.get(`channels/${id}/subscriptions`)
      .then(res => res.data)
  },

  // NOTE: This gives a Timeout error because of Axios for some reason???
  // Only happens sometimes ¯\_(ツ)_/¯ pls fix...
  updateChannel (id, channel) {
    return api.put(`channels/${id}`, { channel })
      .then(res => res.data)
  }

}