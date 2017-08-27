const _ = require('lodash')

module.exports = {

  parse (signature, message, args) {
    let res = { valid: false }

    if (typeof(message) === 'undefined') return res;
    if (!message.startsWith(signature)) return res;
    
    let arr = message.split(' ')
    let cmdArgs = arr.splice(0, args.length)
    cmdArgs.push(arr.join(' '))

    let realArgs = cmdArgs.splice(1, args.length)
    args.forEach((val, index) => res[val] = realArgs[index])

    res.valid = true
    return res
  },

  addCommand (content, service) {
    let cmd = this.parse('!add-cmd', content, ['signature', 'content'])
    if (!cmd.valid) return false;

    return Command.create({
      service,
      signature: cmd.signature,
      content: cmd.content
    })
  },

  deleteCommand (content, service) {
    let cmd = this.parse('!del-cmd', content, ['signature'])
    if(!cmd.valid) return false;

    return Command.destroy({
      where: {
        service: service,
        signature: cmd.signature
      }
    })
  },

  updateCommand (content, service) {
    let cmd = this.parse('!update-cmd', content, ['signature', 'content'])
    if(!cmd.valid) return false;
    
    return Command.update({
      service: service,
      signature: cmd.signature
    }, {
      content: cmd.content
    })
  },

  findCommand (content, service) {
    return Command.find({
      where: { service }
    }).then(stuff => stuff)
  }
}