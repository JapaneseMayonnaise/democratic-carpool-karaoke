import React, { Component } from 'react';
import './App.css';

class PlaylistGenerator extends React.Component
{
  render()
  {
    return(
      <div className="Container">
          <h3>What year were you born in?</h3>
          <button><a href="http://localhost:5000/1930s_user1">1930's</a></button>
          <button><a href="/1940s_user1">1940's</a></button>
          <button><a href="/1950s_user1">1950's</a></button>
          <button><a href="/1960s_user1">1960's</a></button>
          <button><a href="/1970s_user1">1970's</a></button>
          <button><a href="/after1980_user1">After 1980's</a></button>

          <h3>What year was your today's carpool buddy born in?</h3>
          <button><a href="http://localhost:5000/1930s_user2">1930's</a></button>
          <button><a href="/1940s_user2">1940's</a></button>
          <button><a href="/1950s_user2">1950's</a></button>
          <button><a href="/1960s_user2">1960's</a></button>
          <button><a href="/1970s_user2">1970's</a></button>
          <button><a href="/after1980_user2">After 1980's</a></button>
          <br />
          <button class="mix"><a href="http://localhost:5000/merge_createPlaylist">Have a nice ride!</a></button>
      </div>
    );
    }
  }


export default PlaylistGenerator;
