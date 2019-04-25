import React, { Component } from 'react';
import './PlaylistGenerator.css';

class PlaylistGenerator extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state =
    {
      user1: '',
      user2: ''
    };
  };

  render()
  {
    return(
      <div className="PlaylistGenerator_container">
          <h3>What year were you born in?</h3>
          <button>1930</button>

          <h3>What year was your today's carpool buddy born in?</h3>
          <button>1950</button>
          <br />
          <br />
          <button className=""><a href="http://localhost:5000/merge_createPlaylist">Have a nice ride!</a></button>
      </div>
    );
    }
  }


export default PlaylistGenerator;
