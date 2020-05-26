const env = process.env.NODE_ENV || 'development';
const config = require('../../config')[env];
const randomString = require('./randomString');

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