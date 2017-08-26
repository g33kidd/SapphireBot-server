module.exports = {
  connection: 'local_postgres',
  attributes: {

    // If null, means discord and twitch.
    service: {
      type: 'string',
      defaultsTo: null
    },

    signature: {
      type: 'string'
    },

    content: {
      type: 'text',
      defaultsTo: "Default command text... Change me!"
    }
  }
}