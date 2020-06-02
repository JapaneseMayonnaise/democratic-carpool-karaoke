const sharedVar = require('../../config/sharedVariables');
const trackIdArray = require('./trackIdArray');

 /** 
  * Receive 2 user's birth year from front end then determine which playlist URI to assign. 
  *
  * @param  {object} request    used to send request to Spotify API endpoint
  * @param  {object} app        espress instance
  * @param  {object} bodyParser required express middleware for easy request body handling
  * @param  {string} playlistURI_user1 Spotify playlist URI. to be passed to sharedVar.trackIdArray_User1 to fetch track IDs
  * @param  {string} playlistTitle_user1 the playlist title of what is assigned in playlistURI_user1
  * @param  {string} playlistURI_user2 Spotify playlist URI. to be passed to sharedVar.trackIdArray_User2 to fetch track IDs
  * @param  {string} playlistTitle_user2 the playlist title of what is assigned in playlistURI_user2
  */
const generate2TrackIdArrays = (req, res, request, app, bodyParser) => {

  let playlistURI_user1, playlistTitle_user1, playlistURI_user2, playlistTitle_user2;

  switch(req.body.gen1)
  {    
    case '1900':
      playlistURI_user2 = '7olpTqGzGrYuI76ZBlCLgs';
      playlistTitle_user2 = "All Out 20s";
    break;
    case '1910':
      playlistURI_user2 = '5PurqOTEB9F9ZwUtovb8MU';
      playlistTitle_user2 = "All Out 30s";
      break;
    case '1920':
      playlistURI_user2 = '0CZdFXdaI14hzMPdhLwCBT';
      playlistTitle_user2 = "All Out 40s";
    break;
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
      playlistURI_user1 = '0098gmqDhZTMCeGxXUBghm';
      playlistTitle_user1 = "All Out 2000s";
      break;
    case '1990':
      playlistURI_user1 = '6m044n8wYzaKq5nDVW0iKX';
      playlistTitle_user1 = "Pride Party 2020";
      break;
    case '2000':
      playlistURI_user1 = '37i9dQZEVXbMDoHDwVN2tF';
      playlistTitle_user1 = "Global Top 50";
      break;
    case '2010':
      playlistURI_user1 = '51bG0ck3GcCirhWLddBKfU';
      playlistTitle_user1 = "Kids Songs";
      break;
    default:
      playlistURI_user1 = '37i9dQZF1DXab8DipvnuNU';
      playlistTitle_user1 = "Multi Generation";
  };

  switch(req.body.gen2)
  {           
    case '1900':
      playlistURI_user2 = '7olpTqGzGrYuI76ZBlCLgs';
      playlistTitle_user2 = "All Out 20s";
      break;
    case '1910':
      playlistURI_user2 = '5PurqOTEB9F9ZwUtovb8MU';
      playlistTitle_user2 = "All Out 30s";
      break;
    case '1920':
      playlistURI_user2 = '0CZdFXdaI14hzMPdhLwCBT';
      playlistTitle_user2 = "All Out 40s";
    break;
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
      playlistURI_user2 = '0098gmqDhZTMCeGxXUBghm';
      playlistTitle_user2 = "All Out 2000s";
      break;
    case '1990':
      playlistURI_user2 = '0Nifk783vhUt1AOy4kMDUH';
      playlistTitle_user2 = "Badass Bitch Mode";
      break;
    case '2000':
      playlistURI_user2 = '37i9dQZF1DWWAqc46ZJdZf';
      playlistTitle_user2 = "Black Lives Matter";
      break;
    case '2010':
      playlistURI_user2 = '37i9dQZF1DWZhxU4AiByxO';
      playlistTitle_user2 = "Pop 4 Kids";
      break;
    default:
      playlistURI_user2 = '77Sw8wb54decwG859ZaemS';
      playlistTitle_user2 = "Family Dance Party";
  };

  app.use(bodyParser.json());
  
  trackIdArray.generateTrackIdArray(playlistURI_user1, playlistURI_user2, playlistTitle_user1, playlistTitle_user2, request);
}

module.exports = {
   generate2TrackIdArrays : generate2TrackIdArrays
}