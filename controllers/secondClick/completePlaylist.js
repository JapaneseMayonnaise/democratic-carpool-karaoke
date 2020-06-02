const sharedVar = require('../../config/sharedVariables');

/**
 * Push an array of mixed-generation trackIDs into the empty playlist you created,
 * then redirect user to their spotify account.
 */
const pushSongsIntoPlaylist = (req, res, request) => {
  console.log('@completePlaylist sharedVar.user_id', sharedVar.user_id);
  console.log('@completePlaylist sharedVar.playlistId', sharedVar.playlistId);
  console.log('@completePlaylist sharedVar.playlistURL', sharedVar.playlistURL);
  console.log('@completePlaylist sharedVar.trackIdArray_User1', sharedVar.trackIdArray_User1);
  console.log('@completePlaylist sharedVar.trackIdArray_User2', sharedVar.trackIdArray_User2);
  console.log('@completePlaylist sharedVar.mixedArray', sharedVar.mixedArray);
  console.log('@completePlaylist sharedVar.access_token', sharedVar.access_token);


    const add_songs_bodyData =
    {
      uris: sharedVar.mixedArray
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

    request.post(addSongsOptions, (error, resp, body) =>
    {
      if(!error && resp.statusCode === 200 || 201)
      {
        console.log("============= SUCCESS: Merged playlists  ==============");
        console.log(body);
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
}

module.exports = {
   pushSongsIntoPlaylist:pushSongsIntoPlaylist
}