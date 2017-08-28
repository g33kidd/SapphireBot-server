module.exports = {
	connection: 'local_mongo',

	attributes: {
		twitch_stream_live: {
			type: 'boolean',
			defaultsTo: false
		}
	}
}