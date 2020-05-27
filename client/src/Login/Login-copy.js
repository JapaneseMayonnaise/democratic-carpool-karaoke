import React from 'react';
import Footer from '../Footer/Footer'
import '../../node_modules/bulma/css/bulma.css'
import './Login.module.css';

class Login extends React.Component
{
  render()
  {
    return (
      <section className="section">
        <div className="container Login_container">
          <div className="column">
            <div className='h1 title'>D</div>
            <div className='h4 description' >Democratic</div>
          </div>
          <div>
            <div className='h1 title'>C</div>
            <div className='h4 description' >Carpool</div>
          </div>
          <div>
            <div className='h1 title'>K</div>
            <div className='h4 description'>Karaoke</div>
          </div>
          <div>
            <button className='button is-primary  is-light' 
              variant="light" 
              type="submit"
              // href='https://democratic-carpool-karaoke.herokuapp.com/login' 
              href='http://localhost:5000/login' 
              size="lg">
               Join The Party
            </button>
          </div>
          <Footer />
        </div>
      </section>
    )
  }
}

export default Login;