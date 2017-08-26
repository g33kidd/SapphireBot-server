module.exports = {

  // TODO: Probably clean this up and find any bugs... just make it better 
  parse (signature, message, args) {
    let result = { valid: false }

    if (typeof(message) === 'undefined') return result;
    if (!message.startsWith(signature)) return result;
    
    // Split the message and remove the signature.. we don't care about the sig at this point.
    let arr = message.split(' ')

    // Get the rest of the args...
    let cmdArgs = arr.splice(0, args.length)

    // Give me the rest of the arguments...
    cmdArgs.push(arr.join(' '))
    
    // Gets the real args specified by `args`
    let realArgs = cmdArgs.splice(1, args.length)

    args.forEach((val, index) => {
      result[val] = realArgs[index]
    })

    result.valid = true

    return result
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