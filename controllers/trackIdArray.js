/** Take users' birth years as parameters, 
 * then get "track ids" from Spotify API endpoint accordingly, then make an array of 50 track ids which are meant to be merged into one eventually
 *
 * @param  {string} playlistURI  spotify playlist URI based on user's birth year
 * 
 * @param  {string} playlistName name of the playlist. Mostly for debugging purpose
 */

const sharedVar = require('../sharedVariables');

const generateTrackIdArray = 
(playlistURI, playlistName, request) =>
{
   console.log("generateTrackIdArray sharedVar.access_token", sharedVar.access_token);
   
   let trackIdArray = [];

  /**
   * Retrieve maximum 50 track IDs from Spotify
   */
   let playlistOptions =
   {
      url: 'https://api.spotify.com/v1/playlists/' + playlistURI + '/tracks?fields=items(track(uri))&limit=50',
      headers: { 'Authorization': 'Bearer ' + sharedVar.access_token,
               },
      json: true
   };

   request.get(playlistOptions, (error, resp, body) =>
   {
      if(!error && resp.statusCode === 200 || 201)
      {
      console.log("============= SUCCESS: Retrieved URI For " + playlistName + " ==============");
      console.log("body", body);
      
      }
      else
      {
      console.log("============= Failed to retrieve URI  ==============");
      console.log(error);
      console.log(body);
      console.log("error => " + JSON.stringify(error));
      console.log("body => " + JSON.stringify(body));
      console.log(resp.statusCode);
      }

      /**
       * Store all trackIDs you just fetched in trackIdArray
       */

      for(let i = 0; i < body.items.length; i++)
      {
         trackIdArray.push(body.items[i].track.uri);
      }

      console.log('trackIdArray generated🦁:', trackIdArray, trackIdArray.length);     

   })

   return trackIdArray;
}

module.exports = {
   generateTrackIdArray : generateTrackIdArray,
}