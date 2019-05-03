/**
 * this is a node.js application that performs the authorization code flow, which
 * allows you to access users' information on Spotify such as likes, playlists, etc.
 */

const express  = require('express');
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
const redirect_uri = 'http://localhost:5000/callback';
// const redirect_uri = 'https://family-drive.herokuapp.com/callback';
const after_auth_redirectURI = 'http://localhost:3000/PlaylistGenerator';
// const after_auth_redirectURI = 'https://family-drive.herokuapp.com';
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

app.post('/makeAPlaylist', (req, res) => {
  console.log('yay connected');
  console.log('user1 generation: ' + req.body.gen1);
  console.log('user2 generation: ' + req.body.gen2);

  if(req.body.gen1 === '1940')
  {
  getSongURIs_user1("37i9dQZF1DWSV3Tk4GO2fq", "All Out 50s");
  console.log('array: ' + urisOfSongs_User1);
  res.redirect('https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch');
  }


});

/** Extract track ids based on the playlist user1 chose and store them in an array
 *
 * @param  {string} playlistURI  URI of the playlist
 * @param  {string} playlistName name of the playlist
 */
const getSongURIs_user1 = (playlistURI, playlistName) =>
{
  /**
   * retrieve uris
   */
 let playlistOptions =
 {
   url: 'https://api.spotify.com/v1/playlists/' + playlistURI + '/tracks?fields=items(track(uri))&limit=50',
   headers: { 'Authorization': 'Bearer ' + access_token,
            },
   json: true
 };

 request.get(playlistOptions, (error, resp, body) =>
 {

   if(!error && resp.statusCode === 200 || 201)
   {
     console.log("============= SUCCESS: User1 Retrieved URI For " + playlistName + " ==============");
     console.log(body);
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
    * put all the uri of songs in "All Out 50s" in an array uriOfSongs
    */
    urisOfSongs_User1 = [];

    for(let i = 0; i < body.items.length; i++)
    {
      urisOfSongs_User1.push(body.items[i].track.uri);
    }



 });
}

/** Extract track ids based on the playlist user2 chose and store them in an array
 *
 * @param  {string} playlistURI  URI of the playlist
 * @param  {string} playlistName name of the playlist
 */

const getSongURIs_user2 = (playlistURI, playlistName) =>
{
  /**
   * retrieve uris
   */
 let playlistOptions =
 {
   url: 'https://api.spotify.com/v1/playlists/' + playlistURI + '/tracks?fields=items(track(uri))&limit=50',
   headers: { 'Authorization': 'Bearer ' + access_token,
            },
   json: true
 };

 request.get(playlistOptions, (error, resp, body) =>
 {

   if(!error && resp.statusCode === 200 || 201)
   {
     console.log("============= SUCCESS: User2 Retrieved URI For " + playlistName + " ==============");
     // console.log(body);
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
    * put all the uri of songs in "All Out 50s" in an array uriOfSongs
    */
    urisOfSongs_User2 = [];

    for(let i = 0; i < body.items.length; i++)
    {
      urisOfSongs_User2.push(body.items[i].track.uri);
    }
 });
}

app.get('/doAllTheJob', (req, res) =>
{
  /**
   *  make an array of mix of track URIs from 2 playlists
   */
  let scope;

  if(urisOfSongs_User1.length < urisOfSongs_User2.length)
  {
    scope = urisOfSongs_User1.length;
    let whereToInsert = 2;
    for(let i = 0; i < scope; i++)
    {
      urisOfSongs_User2.splice(whereToInsert, 0, urisOfSongs_User1[i], urisOfSongs_User1[i + 1]);
      whereToInsert = whereToInsert + 4;
      i++;
    }
    // console.log(urisOfSongs_User2);
    mergedArrayOfURIs = urisOfSongs_User2;
  }
  else
  {
    scope = urisOfSongs_User2.length;
    let whereToInsert = 2;
    for(let i = 0; i < scope; i++)
    {
      urisOfSongs_User1.splice(whereToInsert, 0, urisOfSongs_User2[i], urisOfSongs_User2[i + 1]);
      whereToInsert = whereToInsert + 4;
      i++;
    }
    // console.log(urisOfSongs_User1);
    mergedArrayOfURIs = urisOfSongs_User1;
  }

  /**
   * create a playlist
   */
    const create_a_playlist_bodyData =
    {
    name: "Family Drive",
    description: "testin",
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

    request.post(playlistOptions, (error, resp, body) =>
    {
      if(!error && resp.statusCode === 200 || 201)
      {
        /**
         * First, create a playlist
         */

        playlistId = body.id;
        playlistURL = body.external_urls.spotify;

        console.log("============= SUCCESS: Created a playlist  ==============");
        // console.log(body);
        console.log('playlistId: ' + playlistId);
        console.log('playlistURL: ' + body.external_urls.spotify);

        /**
         * second, add songs to the playlist using the array of uris of songs
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
      }
      else
      {
        console.log("============= FAIL: Create a playlist  ==============");
        console.log(error);
        console.log(body);
        console.log("error => " + JSON.stringify(error));
        console.log("body => " + JSON.stringify(body));
        console.log(resp.statusCode);
        res.redirect('/playlistGenerator');
      }
    });
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
