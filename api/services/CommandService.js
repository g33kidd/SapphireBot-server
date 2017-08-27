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

  addcom (content, service) {
    let cmd = this.parse('!add-cmd', content, ['signature', 'content'])
    if (!cmd.valid) return;

    Command.create({
      service,
      signature: cmd.signature,
      content: cmd.content
    }).exec((err, record) => {
      console.log(err)
      console.log(record)
    })
  },

  delcom (content, service) {
    let cmd = this.parse('!del-cmd', content, ['signature'])
  },

  updatecom (content, service) {
    let cmd = this.parse('!update-cmd', content, ['signature', 'content'])
  }
}