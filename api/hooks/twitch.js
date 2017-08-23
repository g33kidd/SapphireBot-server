const Twitch = require('tmi.js')

module.exports = function twitch(sails) {

  var channel   = sails.config.twitch.channel
  var nickname  = sails.config.twitch.botNick
  var client    = new Twitch.client(sails.config.twitch)
  
  client.on('connected', (addr, port) => {

  })

  sails.on('discordMessage', (message) => {
    if (message.author.bot) return;
    client.say(channel, `[Discord] ${message.author.username} said: ${message.content}`)
  })

  client.on('join', (channel, username, self) => {
    sails.sockets.broadcast('twitchChannel', 'twitchJoin', { channel, username })
  })

  client.on('message', (channel, userstate, message, self) => {
    // ignore message from this bot...
    if (self) return;
    
    sails.emit('twitchMessage', { channel, userstate, message, self })
    sails.sockets.broadcast('twitchChannel', 'twitchMessage', {
      channel, 
      userstate, 
      message, 
      is_bot: self
    })
  })

  // this.client.on('join', (channel, username, self) => {
  //   this.client.say(channel, `Welcome ${username}! I am a bot. Kappa`)
  // })

  client.connect()
  
  return {
    client: () => client,
    channel: () => channel,
    nickname: () => nickname,
  }
};
