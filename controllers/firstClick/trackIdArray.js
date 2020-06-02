const sharedVar = require('../../config/sharedVariables');

 /** 
  * Fetch maximum 50 trackIds from Spotify API endpoints and put them into an array, then return the array.
  *
  * @param  {string} playlistURI_user1  spotify playlist URI picked based on user1's birth year input
  * @param  {string} playlistTitle_user1 the title of the Spotify playlist you are pulling. Mostly here for clarity/debugging purpose.
  * @param  {string} playlistURI_user2  spotify playlist URI picked based on user2's birth year input
  * @param  {string} playlistTitle_user2 the title of the Spotify playlist you are pulling. Mostly here for clarity/debugging purpose.
  * @param  {object} request used to send request to Spotify API endpoint
  *  
  */
const generateTrackIdArray = (playlistURI_user1, playlistURI_user2, playlistTitle_user1,  playlistTitle_user2, request) => {   
 
  /**
   * Retrieve maximum 50 track IDs from Spotify
   */
   let playlistOptions_user1 =
   {
      url: 'https://api.spotify.com/v1/playlists/' + playlistURI_user1 + '/tracks?fields=items(track(uri))&limit=50',
      headers: { 'Authorization': 'Bearer ' + sharedVar.access_token,
               },
      json: true
   };

   request.get(playlistOptions_user1, (error, res, body) =>
   {
      if(!error && res.statusCode === 200 || 201)
      {
      console.log("============= SUCCESS: Retrieved URI For " + playlistTitle_user1 + " ==============");
      
      }
      else
      {
      console.log("============= Failed to retrieve URI  ==============");
      console.log("error => " + JSON.stringify(error));
      console.log("body => " + JSON.stringify(body));
      console.log(res.statusCode);
      }

      /**
       * Store all trackIDs you just fetched in trackIdArray
       */       
      sharedVar.trackIdArray_User1 = body.items.map(trackInfo => trackInfo.track.uri);
   })

   // do the same operation for user2

        /**
   * Retrieve maximum 50 track IDs from Spotify
   */
   let playlistOptions_user2 =
   {
      url: 'https://api.spotify.com/v1/playlists/' + playlistURI_user2 + '/tracks?fields=items(track(uri))&limit=50',
      headers: { 'Authorization': 'Bearer ' + sharedVar.access_token,
               },
      json: true
   };

   request.get(playlistOptions_user2, (error, res, body) =>
   {
      if(!error && res.statusCode === 200 || 201)
      {
      console.log("============= SUCCESS: Retrieved URI For " + playlistTitle_user2 + " ==============");
      
      }
      else
      {
      console.log("============= Failed to retrieve URI  ==============");
      console.log("error => " + JSON.stringify(error));
      console.log("body => " + JSON.stringify(body));
      console.log(res.statusCode);
      }

      /**
       * Store all trackIDs you just fetched in trackIdArray
       */       
      sharedVar.trackIdArray_User2 = body.items.map(trackInfo => trackInfo.track.uri);        
   })
}

module.exports = {
   generateTrackIdArray : generateTrackIdArray,
}