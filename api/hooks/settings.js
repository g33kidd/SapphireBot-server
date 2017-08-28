module.exports = function settings(sails) {

	// Wait for the application to be lifted.
	// Otherwise it will complain that Settings is not defined.
	sails.on('lifted', async () => {
		_.each(sails.config.setting_presets, async (value, key) => {
			// Check if the setting exists..
			let exists = await Settings.count({ key: key })
			if(!exists) {
				await Settings.create({ key, value })
			}
		})
	})

	return {}
}