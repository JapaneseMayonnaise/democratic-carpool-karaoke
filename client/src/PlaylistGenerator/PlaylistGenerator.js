import React from 'react';
import '../../node_modules/bulma/css/bulma.css'
// import './PlaylistGenerator.module.css'
import './PlaylistGenerator.css'

class PlaylistGenerator extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state =
    {
      user1Generation: '',
      user2Generation: '',
      isPlaylistMadeYet: false,
      playlistName: 'Democratic Carpool Karaoke'
    }
  }

  setValue = (e) =>
  {
    // console.log("value: "+ e.target.value);
    // console.log("name: "+ [e.target.name]);

    this.setState({
      [e.target.name]: e.target.value
    });
  }

  sendUsersGeneration = async e => {
    e.preventDefault();

    // const UriTofetchFrom = 'https://democratic-carpool-karaoke.herokuapp.com/firstClick';
    const UriTofetchFrom = 'http://localhost:5000/firstClick';

    const response = await fetch(UriTofetchFrom,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gen1: this.state.user1Generation,
                             gen2: this.state.user2Generation,
                             playlistName: this.state.playlistName,
                           })
    });
    const body = await response.text();
    this.setState({ isPlaylistMadeYet: body });
  };

  render()
  {
    return(
        <div className="PlaylistGenerator_container">
          <div className="is-grouped">

            <div className="field user1-form-multi-select">
              <div className="label">
                What year were you born in?
              </div>
              <div className="control user1-form-multi-select-options" name="user1Generation" onChange={this.setValue} size="lg">
                <div className="select">
                  <option value=''>Choose...</option>
                  <option value='1930'>Before 1930s</option>
                  <option value='1940'>1940s</option>
                  <option value='1950'>1950s</option>
                  <option value='1960'>1960s</option>
                  <option value='1970'>1970s</option>
                  <option value='1980'>1980s</option>
                  <option value='1990'>1990s</option>
                  <option value='2000'>2000s</option>
                  <option value='2010'>After 2010s</option>
                  <option value=''>Don't even ask</option>
                </div>
              </div>
            </div>

            <div className="field user2-form-multi-select">
              <div className="label">
                What year was your carpool buddy born in?
              </div>
              <div as="select" className="control user2-form-multi-select-options" name="user2Generation" onChange={this.setValue} size="lg">
              <div className="select">

                <option value=''>Choose...</option>
                <option value='1930'>Before 1930s</option>
                <option value='1940'>1941</option>
                <option value='1940'>1942</option>
                <option value='1940'>1943</option>
                <option value='1940'>1944</option>
                <option value='1940'>1945</option>
                <option value='1940'>1940s</option>
                <option value='1940'>1940s</option>
                <option value='1940'>1940s</option>
                <option value='1940'>1940s</option>
                <option value='1940'>1940s</option>
                <option value='1940'>1940s</option>
                <option value='1950'>1950s</option>
                <option value='1960'>1960s</option>
                <option value='1970'>1970s</option>
                <option value='1980'>1980s</option>
                <option value='1990'>1990s</option>
                <option value='2000'>2000s</option>
                <option value='2010'>After 2010s</option>
                <option value=''>Don't even ask</option>
                </div>
              </div>
            </div>

            <div className="field playlist-name">
            <div className="label">
              Playlist Title?
            </div>
              <div>
                <div className="control playlist-name-form" name="playlistName" onChange={this.setValue} type="text" placeholder="Democratic Carpool Karaoke" size="lg"/>
              </div>
            </div>

          </div>

          {this.state.isPlaylistMadeYet ?
            <button 
              className='playlistgenerator-button' 
              type="button" 
              // href='https://democratic-carpool-karaoke.herokuapp.com/secondClick' 
              href='http://localhost:5000/secondClick' 
            >
              Done! Go to your Spotify account
            </button>
            :
            <button 
              className='playlistgenerator-button'
              type="submit"
              onClick={this.sendUsersGeneration} 
            >
             Create Playlist
            </button>
          }
        </div>
    );
    }
}

export default PlaylistGenerator;
