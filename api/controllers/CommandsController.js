module.exports = {

  async list (req, res) {
    let commands = await Command.find()

    if(req.param('group')) {
      return res.json(_.groupBy(commands, 'service'))
    } else {
      return res.json(commands)
    }
  },

  async add (req, res) {
    
  },

  async delete (req, res) {},

  async update (req, res) {}

}