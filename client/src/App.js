import React, { Component } from 'react';
import './App.css';

class Login extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
    needToLogin: true,
  };
  }

  render()
  {
      const beforeLogin = (
                <div className="Kimchi">
                  <div className="Main">
                    <h1>👨👵👶🏽👩🏻‍ Reacty Family Drive 👧🏿👩👨🏻‍👦🏼</h1>
                    <p>Carpool with family/friends from diffreent age groups? Not sure what music to put on?<br />
                    This app can help you! It generates a playlist that consists of hit songs from the time when you are/were in your 20s.</p>
                    <button onClick={()=>{this.setState({needToLogin: false})}}><a href='http://localhost:5000/login'> 🚗 Get started 🚗 </a></button>
                  </div>
              </div>
            );

        const afterLogin = (
                    <div className="Container">
                        <h3>What year were you born in?</h3>
                        <button><a href="/1930s_user1">1930's</a></button>
                        <button><a href="/1940s_user1">1940's</a></button>
                        <button><a href="/1950s_user1">1950's</a></button>
                        <button><a href="/1960s_user1">1960's</a></button>
                        <button><a href="/1970s_user1">1970's</a></button>
                        <button><a href="/after1980_user1">After 1980's</a></button>

                        <h3>What year was your today's carpool buddy born in?</h3>
                        <button><a href="/1930s_user2">1930's</a></button>
                        <button><a href="/1940s_user2">1940's</a></button>
                        <button><a href="/1950s_user2">1950's</a></button>
                        <button><a href="/1960s_user2">1960's</a></button>
                        <button><a href="/1970s_user2">1970's</a></button>
                        <button><a href="/after1980_user2">After 1980's</a></button>
                        <br />
                        <button class="mix"><a href="/merge_createPlaylist">Have a nice ride!</a></button>
                    </div>
              );

      return (
        <div className="Output">{this.state.needToLogin ? beforeLogin : afterLogin }</div>
      )
  }
}

export default Login;
