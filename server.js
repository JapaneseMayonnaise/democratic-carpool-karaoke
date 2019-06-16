/**
 * this is a node.js application that performs the authorization code flow, which
 * allows you to access users' information on Spotify such as likes, playlists, etc.
 */

const express = require('express');
const app = express();
const request = require('request');
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const dotenvConfig = require('dotenv').config();
const stateKey = 'spotify_auth_state';
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const path = require('path');

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
// const redirect_uri = 'http://localhost:5000/callback';
// const after_auth_redirectURI = 'http://localhost:3000/PlaylistGenerator';
const redirect_uri = 'https://democratic-carpool-karaoke.herokuapp.com/callback';
const after_auth_redirectURI = 'https://democratic-carpool-karaoke.herokuapp.com/PlaylistGenerator';
const port = process.env.PORT || 5000;
let access_token, refresh_token, user_id, playlistId, urisOfSongs_User1, urisOfSongs_User2, playlistURL;

/**
 * Generates a random string that consistes of numbers and letters
 * @param  {number} length the length of the string
 * @return {string} the string this function generates
 */
const generateRandomStr = (length) =>
{
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for(let i = 0; i < length; i++)
  {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser())
   .use(cors());

/**
 * Spotify authorization process step 1/3;
 * get an authorization code
 */

app.get('/login', (req, res) =>
{
    let state = generateRandomStr(16);
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
});

/**
 * Spotify authorization process step 2/3;
 * your app requests access token and refresh token after checking the state parameter
 */
app.get('/callback', (req, res) =>
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
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, (error, resp, body) => {
      if (!error && resp.statusCode === 200) {

        access_token = body.access_token,
        refresh_token = body.refresh_token;


        let options =
        {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        /**
         * Spotify authorization process step 3/3;
         * Access to the Spotify web API by using access token
         */
        request.get(options, (error, res, body) => {
          console.log('==================================== Authorization SUCCESS ====================================');
          user_id = body.id;
        });

        /**
         * After authorization, redirect user to the main page of the app
         */
        res.redirect(after_auth_redirectURI);
      } else {
        res.redirect(after_auth_redirectURI +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    }
  );
  }
}
);

/** Extract track ids based on the playlist user1 chose and store them in an array
 *
 * @param  {string} playlistURI_user1  spotify playlist URI based on user1's birth year
 * @param  {string} playlistURI_user2  spotify playlist URI based on user2's birth year
 * @param  {string} playlistName_user1 name of the playlist. Just for developer's benefit
 * @param  {string} playlistName_user2 name of the playlist. Just for developer's benefit
 */
const make2ArraysOfSongIds = (playlistURI_user1, playlistName_user1, playlistURI_user2, playlistName_user2) =>
{
  /**
   * Retrieve song URIs for maximum 50songs
   */
 let playlistOptions_user1 =
 {
   url: 'https://api.spotify.com/v1/playlists/' + playlistURI_user1 + '/tracks?fields=items(track(uri))&limit=50',
   headers: { 'Authorization': 'Bearer ' + access_token,
            },
   json: true
 };

 request.get(playlistOptions_user1, (error, resp, body) =>
 {

   if(!error && resp.statusCode === 200 || 201)
   {
     console.log("============= SUCCESS: User1 Retrieved URI For " + playlistName_user1 + " ==============");
     // console.log(body);
   }
   else
   {
     console.log("============= FAIL: User1 Retrieve URI  ==============");
     console.log(error);
     console.log(body);
     console.log("error => " + JSON.stringify(error));
     console.log("body => " + JSON.stringify(body));
     console.log(resp.statusCode);
   }

   /**
    * Store all song URIs of the playlist in urisOfSongs_User1
    */
    urisOfSongs_User1 = [];

    for(let i = 0; i < body.items.length; i++)
    {
      urisOfSongs_User1.push(body.items[i].track.uri);
    }
    console.log('user1 songid array🦁:' + urisOfSongs_User1);
 });

 /**
  * Do the same for user2.
  * Retrieve song URIs for maximum 50songs
  */
  let playlistOptions_user2 =
  {
    url: 'https://api.spotify.com/v1/playlists/' + playlistURI_user2 + '/tracks?fields=items(track(uri))&limit=50',
    headers: { 'Authorization': 'Bearer ' + access_token,
             },
    json: true
  };

  request.get(playlistOptions_user2, (error, resp, body) =>
  {

    if(!error && resp.statusCode === 200 || 201)
    {
      console.log("============= SUCCESS: User2 Retrieved URI For " + playlistName_user2 + " ==============");
    }
    else
    {
      console.log("============= FAIL: User2 Retrieve URI  ==============");
      console.log(error);
      console.log(body);
      console.log("error => " + JSON.stringify(error));
      console.log("body => " + JSON.stringify(body));
      console.log(resp.statusCode);
    }

    /**
     * Store all song URIs of the playlist in urisOfSongs_User2
     */
     urisOfSongs_User2 = [];

     for(let i = 0; i < body.items.length; i++)
     {
       urisOfSongs_User2.push(body.items[i].track.uri);
     }
     console.log('user2 songid array🦄:' + urisOfSongs_User2);
  });
}

app.post('/readUserGeneration', (req, res) =>
{
  console.log('yay connected!✌️');
  console.log('☘️ User1 generation: ' + req.body.gen1);
  console.log('🌸 User2 generation: ' + req.body.gen2);
  console.log('🦄Playlist Name: ' + req.body.playlistName);

  const create_a_playlist_bodyData =
  {
  name: req.body.playlistName,
  description: "Playlist created by the web application 'Democratic Carpool Karaoke' that consists of songs from multiple generations. 2 songs from either generation are played by turn.",
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

  make2ArraysOfSongIds(playlistURI_user1, playlistTitle_user1, playlistURI_user2, playlistTitle_user2);

  res.send('true');
});

app.get('/createPlaylist' , (req, res) => {
  /**
   *  make an array of mix of track URIs from 2 playlists. Every 2 songs extracted from each playlists.
   */
  let scope = urisOfSongs_User1.length;
    let whereToInsert = 2;
    for(let i = 0; i < scope; i++)
    {
      urisOfSongs_User2.splice(whereToInsert, 0, urisOfSongs_User1[i], urisOfSongs_User1[i + 1]);
      whereToInsert = whereToInsert + 4;
      i++;
    }

  mergedArrayOfURIs = urisOfSongs_User2;

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

/**
 * Request another access token by using refresh token
 */
app.get('/refresh_token', (req, res) => {
  const refresh_token =  req.query.refresh_token;
    let authOptions =
    {
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')) },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      },
      json: true
    }

    request.post(authOptions, (error, res, body) =>
    {
      if(!error && res.statusCode === 200)
      {
          access_token = body.access_token;
        res.send
        ({
          'access_token' : access_token
        });
      }
    });
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
