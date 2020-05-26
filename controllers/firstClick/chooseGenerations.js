const sharedVar = require('../../sharedVariables');
const trackIdArray = require('./trackIdArray');

/**
* Make 2 arrays based on user input
*/
const generate2TrackIdArrays = (req, res, request, app, bodyParser) => {
  let playlistURI_user1, playlistTitle_user1, playlistURI_user2, playlistTitle_user2;

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

  sharedVar.trackIdArray_User1 = trackIdArray.generateTrackIdArray(playlistURI_user1, playlistTitle_user1, request);

  sharedVar.trackIdArray_User2 = trackIdArray.generateTrackIdArray(playlistURI_user2, playlistTitle_user2, request);
}

module.exports = {
   generate2TrackIdArrays : generate2TrackIdArrays
}