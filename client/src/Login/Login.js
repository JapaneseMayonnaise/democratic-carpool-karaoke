import React from 'react';
import '../../node_modules/bulma/css/bulma.css'
// import './Login.module.css';
import './Login.css';

class Login extends React.Component {
  render()
  {
    return (
      <section className="hero is-fullheight">
        <div className="hero-body right">
          <div className="has-text-right has-text-black-super">
            <h1 className="title one-character">
              D
            </h1>
            <h2 className="subtitle post-character">
              <span className="has-text-danger">
                d
              </span>
              emocratic
            </h2>
            <h1 className="title one-character">
              C
            </h1>
            <h2 className="subtitle post-character">
              <span className="has-text-danger">
                c
              </span>
              arpool
            </h2>
            <h1 className="title one-character">
              K
            </h1>
            <h2 className="subtitle post-character">
              <span className="has-text-danger">
                k
              </span>
              araoke
            </h2>

            <a 
              className="is-inline-block gap-between-button-and-title"
              href='http://localhost:5000/login' 
              // href='https://democratic-carpool-karaoke.herokuapp.com/login' 
            >
              <button 
                className="button is-danger button-size is-focused button-font-adjust"
              >
                Join The Party
              </button>
            </a>
          </div>
        </div>

        <div className="hero-foot">
          <div className="margin-bottom margin-left">
            <span class="tag is-danger responsive-size margin-bottom">
              Copyright 2020 &nbsp; 
              <a href="https://shimba.dev">
                Elliot Shimba
              </a>
            </span> <br />
            <span class="tag is-danger responsive-size">
              Photo by &nbsp; <a href="https://unsplash.com/@josefhu15">Jose Hernandez-Uribe</a>
            </span>
          </div>
        </div>
      </section>   
   )
  }
}

export default Login;