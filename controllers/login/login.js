const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config')[env];
const randomString = require('./randomString');

 /** 
  * Requests authorization for information listed in scope.
  *
  * @param  {string} stateKey  cookie name, part of auth process
  * @param  {string} querystring used to serialize an object into string 
  * @param  {string} client_id this app's credential registered on Spotify SDK
  * @param  {string} state random string to make sure there was no intervention while auth process
  * @param  {string} scope what to request access permission for in order to create a playlist and add songs on user's account.
  *  
  */
const handleLogin = (req, res, stateKey, querystring, client_id ) => {
      let state = randomString.generateRandomString(16);
      
      res.cookie(stateKey, state);
  
      const scope = 'user-read-private user-read-email playlist-read-private playlist-modify-public playlist-modify-private';
  
      res.redirect
      ('https://accounts.spotify.com/authorize?' +
        querystring.stringify
        ({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: config.redirect_uri,
            state: state
        })
      );
}

module.exports = {
   handleLogin:handleLogin
}