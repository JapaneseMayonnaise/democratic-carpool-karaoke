import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import SelectGeneration from './SelectGeneration/SelectGeneration'
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
    console.log("value: "+ e.target.value);
    console.log("name: "+ [e.target.name]);

    this.setState({
      [e.target.name]: e.target.value
    });
  }

  sendUsersGeneration = async e => {
    e.preventDefault();

    const UriTofetchFrom = 'https://democratic-carpool-karaoke.herokuapp.com/firstClick';
    // const UriTofetchFrom = 'http://localhost:5000/firstClick';

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
          {/* Memo to self: This div(id="justStackPlz") is here to stack all fields, since Bulma horizontally center everything in hero-body if I didn't have this wrapper */}
          <div id="justStackPlz" className="has-text-right">
            <SelectGeneration 
              labelText='Birth Year: User 1'
              selectName="user1Generation"
              setValue={this.setValue}
            />

            <SelectGeneration 
              labelText='Birth Year: User 2'
              selectName="user2Generation"
              setValue={this.setValue} 
            />
              
            <div className={`field  ${style.formBackground}`}>
              <label 
                className={`label ${style.labelSize}  ${style.labelColour} ${style.titleLabel} `}
              >
                Playlist Name
              </label>
              <div className="control">
                <input 
                  className="input is-danger is-medium"
                  type="text"
                  name="playlistName" 
                  onChange={this.setValue} 
                  placeholder="Democratic Carpool Karaoke" 
                />
              </div>
            </div>

            {this.state.isPlaylistMadeYet ?
            <a
              href='https://democratic-carpool-karaoke.herokuapp.com/secondClick' 
              // href='http://localhost:5000/secondClick' 
            >
              <button 
                className={`button is-danger is-focused ${style.buttonSize} ${style.buttonFontAdjust} ${style.neon} ${style.gapBetweenButtonAndTitle}`}
                type="submit" 
              >
                Go to Spotify
              </button>
            </a>
            :

            <button 
              className={`button is-danger is-focused ${style.buttonSize} ${style.buttonFontAdjust} ${style.gapBetweenButtonAndTitle} ${style.neon}`}
              type="submit"
              onClick={this.sendUsersGeneration} 
            >
             Create Playlist
            </button>
            }
        </div>

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
