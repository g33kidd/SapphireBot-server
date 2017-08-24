const axios = require('axios')

// TODO: Implement auth flow for twitch. Instead of setting it this way..
const api   = axios.create({
  baseURL: 'https://api.twitch.tv/kraken/',
  timeout: 1000,
  headers: {
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
      .then(res => {
        return res.data.stream
      })
  },

  searchChannels (query) {
    return api.get('search/channels', { params: { query: query } })
      .then(res => res.data)
  },

  findChannel (name) {
    return this.searchChannels(name)
      .then(data => data.channels.find(c => c.name === name))
  },

  followers () {},

  subscribers () {},

}