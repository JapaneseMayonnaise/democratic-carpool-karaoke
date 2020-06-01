const sharedVar = require('../../config/sharedVariables');

 /** 
  * Fetch maximum 50 trackIds from Spotify API endpoints and put them into an array, then return the array.
  *
  * @param  {array}  trackIdArray  has maximum 50 trackIDs. It gets generated for each user to be meerged later.
  * @param  {string} playlistURI  spotify playlist URI picked based on user's birth year input
  * @param  {string} playlistTitle the title of the Spotify playlist you are pulling. Mostly here for clarity.
  * @param  {object} request used to send request to Spotify API endpoint
  *  
  */
const generateTrackIdArray = (playlistURI, playlistTitle, request) => {   

   let trackIdArray=[];

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
      console.log("============= SUCCESS: Retrieved URI For " + playlistTitle + " ==============");
      
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

       console.log('body.items --->', body.items );
       
      for(let i = 0; i < body.items.length; i++)
      {
         trackIdArray.push(body.items[i].track.uri);
      }
      console.log('trackIdArray generated with for loop🦁:', trackIdArray);     

      // trackIdArray = body.items.map(trackInfo => trackInfo.track.uri);

      // console.log('trackIdArray generated with map🦁:', trackIdArray);     

   })
   
   // console.log('right before return', trackIdArray);
   
   return trackIdArray;
}

module.exports = {
   generateTrackIdArray : generateTrackIdArray,
}