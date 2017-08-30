const tall  = require('tall').default
const exp   = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
const regex = new RegExp(exp)

const whitelist = [
  'https://discordapp.com'
]

module.exports = {
  events: {
    async message ({message}) {
      let matches = message.content.match(regex)

      if (matches) {
        console.log(matches)
        _.each(matches, async m => {
          let url = await tall(m)
          message.channel.send(`
⚠️⚠️ **WARNING** ⚠️⚠️
I detected a URL that redirects to somewhere else.
Here's the URL it redirects to. BE SAFE! 🙋‍
${url}`)
        })
      } else {
        console.log("no matches")
      }
    }
  }
}
