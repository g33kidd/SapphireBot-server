module.exports = {
  connection: 'local_postgres',
  attributes: {

    // If null, means discord and twitch.
    service: {
      type: 'string',
      defaultTo: null
    },

    signature: {
      type: 'string'
    },

    content: {
      type: 'text',
      defaultTo: "Default command text... Change me!"
    }
  }
}