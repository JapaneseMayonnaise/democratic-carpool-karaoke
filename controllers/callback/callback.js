const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config')[env];
const sharedVar = require('../../config/sharedVariables');

const handleCallback = 
(req, res, stateKey, querystring, client_id,client_secret, request) => 
 {
   const code = req.query.code || null;
   const state = req.query.state || null;
   const storedState = req.cookies ? req.cookies[stateKey] : null;

   if (state === null || state !== storedState)
   {
     res.redirect
     ('/#' + querystring.stringify
             ({
               error: 'state_mismatch on callback'
             })
     );
   }
   else
   {
     res.clearCookie(stateKey);
 
     let authOptions =
     {
       url: 'https://accounts.spotify.com/api/token',
       form: {
         code: code,
         redirect_uri: config.redirect_uri,
         grant_type: 'authorization_code'
       },
       headers: {
         'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
       },
       json: true
     };
 
     request.post(authOptions, (error, resp, body) => 
     {
       if (!error && resp.statusCode === 200) {
 
        sharedVar.access_token = body.access_token;
         console.log("ACCESS TOKEN in handlecallback.js ",sharedVar.access_token);
         
         refresh_token = body.refresh_token;
 
         let options =
         {
           url: 'https://api.spotify.com/v1/me',
           headers: { 'Authorization': 'Bearer ' + sharedVar.access_token },
           json: true
         };
 
         /**
          * Spotify authorization process step 3/3;
          * Access to the Spotify web API by using access token
          */
         request.get(options, (error, res, body) => {
           console.log('==================================== Authorization SUCCESS ====================================');
           console.log("BODY ---> ", body);
           
           sharedVar.user_id = body.id;
         });
 
         /**
          * After authorization, redirect user to the main page of the app
          */         
         res.redirect(config.after_auth_redirectURI);
       } else {
         res.redirect(config.after_auth_redirectURI +
           querystring.stringify({
             error: 'invalid_token'
           }));
       }
     }
   );}
  }

module.exports = {
   handleCallback:handleCallback
}