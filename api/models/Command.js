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

    enabled: {
      type: 'boolean',
      defaultsTo: true
    },

    content: {
      type: 'text',
      defaultsTo: "Default command text... Change me!"
    }
  }
}