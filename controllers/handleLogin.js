const handleLogin = (req, res, randomString, stateKey, querystring, client_id, redirect_uri) => {
      let state = randomString.generateRandomString(16);
      
      res.cookie(stateKey, state);
  
      const scope = 'user-read-private user-read-email playlist-read-private playlist-modify-public';
  
      res.redirect
      ('https://accounts.spotify.com/authorize?' +
        querystring.stringify
        ({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        })
      );
}

module.exports = {
   handleLogin:handleLogin
}