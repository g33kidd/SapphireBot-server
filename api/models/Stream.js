module.exports = {
	connection: 'local_mongo',

	attributes: {
		started_at: {
			type: 'datetime'
		},
		views: {
			type: 'integer',
			defaultsTo: 0
		},
		status: {
			type: 'string'
		},
		game: {
			type: 'string'
		},
    current: {
      type: 'boolean',
      defaultsTo: false
    }
	}
}
