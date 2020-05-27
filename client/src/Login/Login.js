import React from 'react';
import '../../node_modules/bulma/css/bulma.css'
// import './Login.module.css';
import './Login.css';

class Login extends React.Component {
  render()
  {
    return (
      <section className="hero is-fullheight">
        <div className="hero-body right no-padding-top">
          <div className="has-text-right">
            <h1 className="title one-character">
              D
            </h1>
            <h2 className="subtitle">
              democratic
            </h2>
            <h1 className="title one-character">
              C
            </h1>
            <h2 className="subtitle">
              carpool
            </h2>
            <h1 className="title one-character">
              K
            </h1>
            <h2 className="subtitle">
              karaoke
            </h2>
            <button 
              className="button is-danger size"
              // href='https://democratic-carpool-karaoke.herokuapp.com/login' 
              href='http://localhost:5000/login' 
            >
                Join The Party
            </button>
          </div>
        </div>

        <div className="hero-foot">
          <div className="">
            <p>
              Copyright 2020 <a href="https://shimba.dev">Elliot Sbimba</a>
            </p>
            <p>
              Photo credit: <a href="https://unsplash.com/@josefhu15">Jose Hernandez-Uribe</a>
            </p>
          </div>
        </div>
      </section>   
   )
  }
}

export default Login;