const regex = /\{([0-9a-zA-Z_.]+)\}/g
const _     = require('lodash')

module.exports = {
  format (string, obj) {
    return string.replace(regex, (match, i, index) => {
      if(_.hasIn(obj, i)) {
        return _.get(obj, i, 'notFound')
      }
    })
  }
}
