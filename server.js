const express = require('express');
const app = express();
const request = require('request');
const cors = require('cors');
const dotenvConfig = require('dotenv').config();
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const stateKey = 'spotify_auth_state';
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const path = require('path');

const randomString = require('./controllers/generateRandomString');
const login = require('./controllers/handleLogin');
const callback = require('./controllers/handleCallback');
const playlistUrl = require('./controllers/generatePlaylistUrl');
const trackIdArrays = require('./controllers/generate2TrackIdArrays');

const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const port = process.env.PORT || 5000;
const sharedVar = require('./sharedVariables');

// to be deleted once confirmed working properly
// const client_id = 'da0a07e0e2db4ea1be6e463d08ebef73';
// const client_secret = '505218038c45415ea3d5bfafe7c694a8';
// const config.redirect_uri = 'http://localhost:5000/callback';
// const config.after_auth_redirectURI = 'http://localhost:3000/PlaylistGenerator';
// // const config.redirect_uri = 'https://democratic-carpool-karaoke.herokuapp.com/callback';
// // const config.after_auth_redirectURI = 'https://democratic-carpool-karaoke.herokuapp.com/PlaylistGenerator';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser())
   .use(cors());

/**
 * Spotify authorization process step 1/3;
 * get an authorization code
 */
app.get('/login', (req, res) => {
  login.handleLogin(req, res, randomString, stateKey, querystring, client_id)
});

/**
 * Spotify authorization process step 2/3;
 * Variables that get set in this function:
 * access_token, refresh_token, 
 */
// app.get('/callback', (req, res) => {  
//   const code = req.query.code || null;
//   const state = req.query.state || null;
//   const storedState = req.cookies ? req.cookies[stateKey] : null;

//   if (state === null || state !== storedState)
//   {
//     res.redirect
//     ('/#' + querystring.stringify
//             ({
//               error: 'state_mismatch on callback'
//             })
//     );
//   }
//   else
//   {
//     res.clearCookie(stateKey);

//     let authOptions =
//     {
//       url: 'https://accounts.spotify.com/api/token',
//       form: {
//         code: code,
//         redirect_uri: config.redirect_uri,
//         grant_type: 'authorization_code'
//       },
//       headers: {
//         'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
//       },
//       json: true
//     };

//     request.post(authOptions, (error, resp, body) => 
//     {
//       if (!error && resp.statusCode === 200) {

//         access_token = body.access_token;        
//         refresh_token = body.refresh_token;

//         let options =
//         {
//           url: 'https://api.spotify.com/v1/me',
//           headers: { 'Authorization': 'Bearer ' + access_token },
//           json: true
//         };

//         /**
//          * Spotify authorization process step 3/3;
//          * Access to the Spotify web API by using access token
//          */
//         request.get(options, (error, res, body) => {
//           console.log('==================================== Authorization SUCCESS ====================================');
//           user_id = body.id;
//         });

//         /**
//          * After authorization, redirect user to the main page of the app
//          */
//         res.redirect(config.after_auth_redirectURI);
//       } else {
//         res.redirect(config.after_auth_redirectURI +
//           querystring.stringify({
//             error: 'invalid_token'
//           }));
//       }
//     }
//   );}
// });

app.get('/callback', (req, res) => {
  callback.handleCallback(req, res, stateKey, querystring, client_id, client_secret,request)
});

/**
 * Receive users input from front end, create a playlist placeholder, make 2 trackIdarrays based on that
 * Variables that get set in this function:
 * sharedVar.playlistId, sharedVar.playlistURL, sharedVar.trackIdArray_User1, sharedVar.trackIdArray_User2
 */
app.post('/readUserGeneration', (req, res) => {
  console.log('🦄Playlist Name: ' + req.body.playlistName);
  console.log('☘️ User1 generation: ' + req.body.gen1);
  console.log('🌸 User2 generation: ' + req.body.gen2);

  playlistUrl.generatePlaylistUrl(req, res, request)
  trackIdArrays.generate2TrackIdArrays(req, res, request, app, bodyParser)

  res.send('true'); 
});   

/**
 * Actually add songs to the playlist placeholder using mergedArrayOfURIs
 * 
 * Variables that get set in this function:
 * mergedArrayOfURIs
 */
app.get('/createPlaylist' , (req, res) => {
    /**
     *  make an array of mix of track URIs from 2 playlists. Every 2 songs extracted from each playlists.
     */

    // console.log('sharedVar.trackIdArray_User1 second  --> ', sharedVar.trackIdArray_User1, sharedVar.trackIdArray_User1.length);
    // console.log('sharedVar.trackIdArray_User2 second --> ', sharedVar.trackIdArray_User2, sharedVar.trackIdArray_User2.length, sharedVar.trackIdArray_User2.length);

      let whereToInsert = 2;
      for(let i = 0; i < sharedVar.trackIdArray_User1.length; i++)
      {
        sharedVar.trackIdArray_User2.splice(whereToInsert, 0, sharedVar.trackIdArray_User1[i], sharedVar.trackIdArray_User1[i + 1]);
        whereToInsert = whereToInsert + 4;
        i++;
      }

    mergedArrayOfURIs = sharedVar.trackIdArray_User2;
    console.log('mergedArrayOfURIs', mergedArrayOfURIs);
      
    /**
     * Add songs to the playlist using the array of uris of songs
     */
    const add_songs_bodyData =
    {
      uris: mergedArrayOfURIs
    }

    let addSongsOptions =
    {
      url: 'https://api.spotify.com/v1/playlists/' + sharedVar.playlistId + '/tracks',
      headers: {
                  'Authorization': 'Bearer ' + sharedVar.access_token
                },
      json: true,
      body: add_songs_bodyData
    };

    request.post(addSongsOptions, (error, respo, bodyy) =>
    {
      if(!error && respo.statusCode === 200 || 201)
      {
        console.log("============= SUCCESS: Merged playlists  ==============");
        console.log(bodyy);
      }
      else
      {
        console.log("============= FAIL: Merge playlists  ==============");
        console.log(error);
        console.log(body);
        console.log("error => " + JSON.stringify(error));
        console.log("body => " + JSON.stringify(body));
        console.log(resp.statusCode);
      }
    });

    res.redirect(sharedVar.playlistURL);
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
