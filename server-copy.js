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
const trackIdArray = require('./controllers/trackIdArray');
const login = require('./controllers/handleLogin');
const callback = require('./controllers/handleCallback');

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

// let user_id, 
// playlistId, 
// access_token, 
// trackIdArray_User1, 
// trackIdArray_User2, 
// playlistURL;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser())
   .use(cors());

/**
 * Spotify authorization process step 1/3;
 * get an authorization code
 */
app.get('/login', (req, res) => { login.handleLogin(req, res, randomString, stateKey, querystring, client_id)});

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
  callback.handleCallback(req, res, stateKey, querystring, client_id, client_secret,request,user_id,access_token);
  console.log("access_token right after handleCallback", access_token);
  
});

/**
 * Receive users input from front end, create a playlist placeholder, make 2 trackIdarrays based on that
 * Variables that get set in this function:
 * playlistId, playlistURL, trackIdArray_User1, trackIdArray_User2
 */
app.post('/readUserGeneration', (req, res) =>
{
  console.log("access token /readUserGeneratoon", access_token);
  console.log('☘️ User1 generation: ' + req.body.gen1);
  console.log('🌸 User2 generation: ' + req.body.gen2);
  console.log('🦄Playlist Name: ' + req.body.playlistName);

  const create_a_playlist_bodyData =
  {
    name: req.body.playlistName,
    description: "Mixed-generation playlist created by the application 'Democratic Carpool Karaoke'. 2 songs from either generation are played by turn.",
    public: true
  }

  let playlistOptions =
  {
    url: 'https://api.spotify.com/v1/users/' + user_id + '/playlists',
    headers: { 'Authorization': 'Bearer ' + access_token,
               'Content-Type' : 'application/json'
             },
    json: true,
    body: create_a_playlist_bodyData
  };

  /**
   * create a playlist
   */
  request.post(playlistOptions, (error, resp, body) =>
  {
    console.log("body.external_urls", body.external_urls);
    
    if(!error && resp.statusCode === 200 || 201)
    {
      playlistId = body.id;
      playlistURL = body.external_urls.spotify;

      console.log("============= SUCCESS: Created a playlist  ==============");
      // console.log(body);
      console.log('playlistId: ' + playlistId);
      console.log('playlistURL: ' + body.external_urls.spotify);
    }
    else
    {
      console.log("============= FAIL: Create a playlist  ==============");
      console.log(error);
      console.log(body);
      console.log("error => " + JSON.stringify(error));
      console.log("body => " + JSON.stringify(body));
      console.log(resp.statusCode);
      res.send('failed to create a playlist');
    }
  });

  switch(req.body.gen1)
  {
    case '1930':
      playlistURI_user1 = '37i9dQZF1DWSV3Tk4GO2fq';
      playlistTitle_user1 = "All Out 50s";
      break;
    case '1940':
      playlistURI_user1 = '37i9dQZF1DXaKIA8E7WcJj';
      playlistTitle_user1 = "All Out 60s";
      break;
    case '1950':
      playlistURI_user1 = '37i9dQZF1DWTJ7xPn4vNaz';
      playlistTitle_user1 = "All Out 70s";
      break;
    case '1960':
      playlistURI_user1 = '37i9dQZF1DX4UtSsGT1Sbe';
      playlistTitle_user1 = "All Out 80s";
      break;
    case '1970':
      playlistURI_user1 = '37i9dQZF1DXbTxeAdrVG2l';
      playlistTitle_user1 = "All Out 90s";
      break;
    case '1980':
      playlistURI_user1 = '37i9dQZF1DX843Qf4lrFtZ';
      playlistTitle_user1 = "Latest Hits";
      break;
    case '1990':
      playlistURI_user1 = '2CJsD3fcYJWcliEKnwmovU';
      playlistTitle_user1 = "Top 50 Global";
      break;
    case '2000':
      playlistURI_user1 = '3Zu0J0JzSRzAT32LgFyg7i';
      playlistTitle_user1 = "Top New 2019 in England";
      break;
    case '2010':
      playlistURI_user1 = '51bG0ck3GcCirhWLddBKfU';
      playlistTitle_user1 = "Kids Songs";
      break;
    default:
      playlistURI_user1 = '5Zv7fTFAnzrMIHFrxQycLS';
      playlistTitle_user1 = "Multi Generation";
  };

  switch(req.body.gen2)
  {
    case '1930':
      playlistURI_user2 = '37i9dQZF1DWSV3Tk4GO2fq';
      playlistTitle_user2 = "All Out 50s";
      break;
    case '1940':
      playlistURI_user2 = '37i9dQZF1DXaKIA8E7WcJj';
      playlistTitle_user2 = "All Out 60s";
      break;
    case '1950':
      playlistURI_user2 = '37i9dQZF1DWTJ7xPn4vNaz';
      playlistTitle_user2 = "All Out 70s";
      break;
    case '1960':
      playlistURI_user2 = '37i9dQZF1DX4UtSsGT1Sbe';
      playlistTitle_user2 = "All Out 80s";
      break;
    case '1970':
      playlistURI_user2 = '37i9dQZF1DXbTxeAdrVG2l';
      playlistTitle_user2 = "All Out 90s";
      break;
    case '1980':
      playlistURI_user2 = '6rzrCJQ8BicVz2mdHiAWr0';
      playlistTitle_user2 = "Weekly Hits";
      break;
    case '1990':
      playlistURI_user2 = '2BAkAh0GWqDwuSFEJsH1wJ';
      playlistTitle_user2 = "Low Volume Funk";
      break;
    case '2000':
      playlistURI_user2 = '37i9dQZF1DWSrj7tqQ9IOu';
      playlistTitle_user2 = "French Indie Pop";
      break;
    case '2010':
      playlistURI_user2 = '37i9dQZF1DWZhxU4AiByxO';
      playlistTitle_user2 = "Pop 4 Kids";
      break;
    default:
      playlistURI_user2 = '08dTiXNDWDTBVbBEbJ7Qq8';
      playlistTitle_user2 = "Multi Generation";
  };

  app.use(bodyParser.json());

  trackIdArray_User1 = trackIdArray.generateTrackIdArray(playlistURI_user1, playlistTitle_user1, access_token, request);

  trackIdArray_User2 = trackIdArray.generateTrackIdArray(playlistURI_user2, playlistTitle_user2, access_token, request);
  
  // console.log('trackIdArray_User1 first --> ', trackIdArray_User1);
  // console.log('trackIdArray_User2 first --> ', trackIdArray_User2);

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

    // console.log('trackIdArray_User1 second  --> ', trackIdArray_User1, trackIdArray_User1.length);
    // console.log('trackIdArray_User2 second --> ', trackIdArray_User2, trackIdArray_User2.length, trackIdArray_User2.length);

      let whereToInsert = 2;
      for(let i = 0; i < trackIdArray_User1.length; i++)
      {
        trackIdArray_User2.splice(whereToInsert, 0, trackIdArray_User1[i], trackIdArray_User1[i + 1]);
        whereToInsert = whereToInsert + 4;
        i++;
      }

    mergedArrayOfURIs = trackIdArray_User2;
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
      url: 'https://api.spotify.com/v1/playlists/' + playlistId + '/tracks',
      headers: {
                  'Authorization': 'Bearer ' + access_token
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

    res.redirect(playlistURL);
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
