import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import '../../node_modules/bulma/css/bulma.css'
import style from  './PlaylistGenerator.module.css';

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
      <section className={`hero is-fullheight ${style.heroBackground}`}>
        <div className="hero-head"></div>
        <div className={`hero-body ${style.right} ${style.heroBodySpacing}`}>
          
            <div className="field">
              <div className="label">
                What year were you born in?
              </div>
              <div 
                className="control" 
                name="user1Generation" 
                onChange={this.setValue}
              >
                <div className="select">
                  <select name="" id="">
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
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <div className="label">
                What year was your carpool buddy born in?
              </div>
              <div 
                className="control"
                name="user2Generation"
                onChange={this.setValue}
              >
              <div className="select">
              <select name="" id="">
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
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <div className="label">
                Playlist Title?
              </div>
              <div>
                <input 
                  className="control" 
                  name="playlistName" 
                  onChange={this.setValue} 
                  type="text" 
                  placeholder="Democratic Carpool Karaoke" 
                />
              </div>
            </div>

            {this.state.isPlaylistMadeYet ?
            <button 
              className='button' 
              type="submit" 
              // href='https://democratic-carpool-karaoke.herokuapp.com/secondClick' 
              href='http://localhost:5000/secondClick' 
            >
              Done! Go to your Spotify account
            </button>
            :

            <button 
              className={`button is-danger is-focused ${style.buttonSize} ${style.buttonFontAdjust} ${style.neon}`}
              type="submit"
              onClick={this.sendUsersGeneration} 
            >
             Create Playlist
            </button>
          }
        </div>

        <div className="hero-foot">
          <div className={`${style.marginLeft} ${style.heroFootSpacing}`}>
              <span className={`tag is-danger ${style.tagSpacing}`}>
                Copyright 2020 &nbsp; 
                <a href="https://shimba.dev">
                Elliot Shimba
                </a> &nbsp; | &nbsp;
                <a href="https://github.com/DrCardamom/democratic-carpool-karaoke">
                <FontAwesomeIcon icon={faGithub} /> Source code
                </a>
              </span> <br />
              <span className={`tag is-danger ${style.tagSpacing}`}>
                Photo credit : &nbsp; <a href="https://unsplash.com/@josefhu15">Jose Hernandez-Uribe</a>
              </span>
          </div>
        </div>
      </section>   
    );
  }
}

export default PlaylistGenerator;
