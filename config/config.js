const config = 
{
   development: {
      redirect_uri:'http://localhost:5000/callback',
      after_auth_redirectURI: 'http://localhost:3000/PlaylistGenerator',
   },
   production: {
      redirect_uri:'https://democratic-carpool-karaoke.herokuapp.com/callback',
      after_auth_redirectURI: 'https://democratic-carpool-karaoke.herokuapp.com/PlaylistGenerator',
   }
};

module.exports = config;