/** Take users' birth years as parameters, 
 * then get "track ids" from Spotify API endpoint accordingly, then make an array of 50 track ids which are meant to be merged into one eventually
 *
 * @param  {string} playlistURI_user1  spotify playlist URI based on user1's birth year
 * @param  {string} playlistURI_user2  spotify playlist URI based on user2's birth year
 * @param  {string} playlistName_user1 name of the playlist. Just for developer's benefit
 * @param  {string} playlistName_user2 name of the playlist. Just for developer's benefit
 */
const generateTrackIdArray = (playlistURI_user1, playlistName_user1, playlistURI_user2, playlistName_user2, access_token, request) =>
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

//   return urisOfSongs;
}

module.exports = {
   generateTrackIdArray : generateTrackIdArray,
}