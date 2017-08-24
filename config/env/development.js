/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  discord: {
    botToken: 'MzQ2NDY2MjkxNzM5MTMxOTA1.DH8YBQ.ijuQoWZzrroIuYst3q-t-6mLU0g',
    clientId: '346466291739131905',
    clientSecret: 'a1PLbAbryNv0SLKu0_QydHNVOQvRgzU_'
  },

  twitch: {
    channel: '#g33kidd',
    channelOAuth: 'oauth:tdf9zbrk5p9yz3xnyuzwror15t9tqt',
    clientId: 'wsovwp57czp31e1az6gqqydkqnzejy',
    clientSecret: '0usrpkd58ddo9q94hej6ag2f2q1r7b',
    oauth: 'm5ax9no5iw2kjau7m8e4lr5n7v6t2x',
    botNickname: 'g33kiddbot',
    botOAuth: 'oauth:suzslh44w9wkzcd2gfn0p37zliafds',
    identity: {
      password: 'oauth:suzslh44w9wkzcd2gfn0p37zliafds'
    }
  }

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  // models: {
  //   connection: 'someMongodbServer'
  // }

};
