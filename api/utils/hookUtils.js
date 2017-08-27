const _          = require('lodash')
const includeAll = require('include-all')
const path       = require('path')

module.exports = {

  loadPlugins (service) {
    const pluginPath = path.join(sails.config.appPath, 'api', 'plugins')

    // TODO: Need this?
    // const files = includeAll({
    //   dirname: path.join(pluginPath),
    //   filter: /(.+Plugin)\.js$/,
    //   excludeDirs: /(discord|twitch)$/
    // })

    const folders = includeAll({
      dirname: path.join(pluginPath, service),
      filter: /(.+)\.js$/
    })

    return _.assign({}, folders)
  }
  
}