const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config')[env];
const sharedVar = require('../../config/sharedVariables');

/**
 * Spotify authorization process step 2&3/3;
 * Access to the Spotify web API by using access token if successful, 
 * 2 imporatant variables get set in this module: sharedVar.access_token, sharedVar.user_id
 * then redirect a user to redirect URI
 * 
 * @param  {string} stateKey cookie name, part of auth process
 * @param  {string} querystring used to serialize an object into string 
 * @param  {string} client_id this app's credential registered on Spotify SDK  
 * @param  {string} client_secret this app's credential registered on Spotify SDK  
 * @param  {string} state random string to make sure there was no intervention while auth process
 * @param  {object} request used to send request to Spotify API endpoint
 * @param  {object} code authorization code that can be exchanged for an access token
 */
const handleCallback = 
(req, res, stateKey, querystring, client_id, client_secret, request) => 
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
        //  refresh_token = body.refresh_token;
 
         let options =
         {
           url: 'https://api.spotify.com/v1/me',
           headers: { 'Authorization': 'Bearer ' + sharedVar.access_token },
           json: true
         };

         request.get(options, (error, res, body) => {
           console.log('==================================== Authorization SUCCESS ====================================');
           
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