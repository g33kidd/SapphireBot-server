/**
 * Settings
 *
 * Primarily for defining the application default settings.
 * Everything that can be configured by the client, should be defined here.
 *
 * When the application starts, we run a series of initialization functions
 * that check if these settings are fields in the database.
 * 
 * If a setting is missing, we'll create the setting and give it a default value.
 * If you create a plugin, add your settings here if you wish to be able to access them.
 */

module.exports = {

	setting_presets: {
		/**
		 * For permissions. Who can access which commands, etc...
		 */
		admin_role: '',
		admin_user: '117046039277469696',

		/**
		 * Announcements for things like when a stream went live, or somebody followed.
		 */
		announcement_channel: '',
		announcement_enabled: false,
		announce_stream_channel: '',
		announce_stream_enabled: true,

		/**
		 * Any other configuration...
		 */
		chat_relay_enabled: false
	}

}