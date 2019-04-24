import React, { Component } from 'react';
import './App.css';

class Login extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
    };
  }

  render()
  {
    return (
      <div className="Kimchi">
        <div className="Main">
          <h1>👨👵👶🏽👩🏻‍ Reacty Family Drive 👧🏿👩👨🏻‍👦🏼</h1>
          <p>Carpool with family/friends from diffreent age groups? Not sure what music to put on?<br />
          This app can help you! It generates a playlist that consists of hit songs from the time when you are/were in your 20s.</p>
          <button><a href='http://localhost:5000/login'> 🚗 Get started 🚗 </a></button>
        </div>
      </div>
    )
  }
}

export default Login;
