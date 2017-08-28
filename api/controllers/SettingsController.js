module.exports = {

	async all (req, res) {
		let settings = await Settings.find()
		return res.json(settings)
	}

}