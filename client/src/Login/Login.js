import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import '../../node_modules/bulma/css/bulma.css'
import style from  './Login.module.css';

class Login extends React.Component {
  render()
  {
    return (
      <section className={`hero is-fullheight ${style.heroBackground}`}>
        <div className="hero-head"></div>
        <div className={`hero-body ${style.right} ${style.heroBodySpacing}`}>
          <div className="has-text-right">
            <h1 className={`title ${style.titleColour} ${style.oneCharacter}`}>
              D
            </h1>
            <h2 className={`subtitle ${style.titleColour} ${style.postCharacter}`}>
              <span className="has-text-danger">
                d
              </span>
              emocratic
            </h2>
            <h1 className={`title ${style.titleColour} ${style.oneCharacter}`}>
              C
            </h1>
            <h2 className={`subtitle ${style.titleColour} ${style.postCharacter}`}>
              <span className="has-text-danger">
                c
              </span>
              arpool
            </h2>
            <h1 className={`title ${style.titleColour} ${style.oneCharacter} ${style.stayBlack} `}>
              K
            </h1>
            <h2 className={`subtitle ${style.titleColour} ${style.postCharacter}`}>
              <span className="has-text-danger">
                k
              </span>
               araoke
            </h2>

            <a 
              className={`${style.isInlineBlock} ${style.gapBetweenButtonAndTitle}`}
              // href='http://localhost:5000/login' 
              href='https://democratic-carpool-karaoke.herokuapp.com/login'
            >
              <button 
                className={`button is-danger is-focused ${style.buttonSize} ${style.buttonFontAdjust} ${style.neon}`}
              >
                Join The Party
              </button>
            </a>
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
   )
  }
}

export default Login;