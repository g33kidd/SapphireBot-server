const formatUtils = require('../utils/formatUtils')

module.exports = {

  initBotSettings () {
  	console.log(sails.config.settings.discord)
  },

  initAppSettings () {
  },


  async get (key) {
    await Settings.findOne({ key })
  },

  async getWithFormat (key, obj) {
    let setting = await Settings.findOne({ key: key })
    if (setting) {
      let format = formatUtils.format(setting.value, obj)
      return format
    } else {
      return null
    }
  }

}
