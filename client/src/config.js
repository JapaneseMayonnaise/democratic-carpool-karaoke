const config = 
{
   development: {
      login_url:'http://localhost:5000/login',
      first_click_url: 'http://localhost:5000/firstClick',
      second_click_url: 'http://localhost:5000/secondClick'
   },
   production: {
      login_url:'https://democratic-carpool-karaoke.herokuapp.com/callback',
      first_click_url: 'https://democratic-carpool-karaoke.herokuapp.com/firstClick',
      second_click_url: 'https://democratic-carpool-karaoke.herokuapp.com/secondClick'
   }
};

module.exports = config;