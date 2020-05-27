import React, { Component } from 'react';
import './Login.css';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class Login extends React.Component
{
  render()
  {
    return (
      <>
        <div className="Login_container">
          <Row>
            <Col className='h1 d' xs={{span:1, offset:0}}>D</Col>
            <Col className='h4 description' xs={{span:1, offset:0}}>Democratic</Col>
          </Row>
          <Row>
            <Col className='h1 c' xs={{span:1, offset:0}}>C</Col>
            <Col className='h4 description' xs={{span:1, offset:0}}>Carpool</Col>
          </Row>
          <Row>
            <Col className='h1 k' xs={{span:1, offset:0}}>K</Col>
            <Col className='h4 description' xs={{span:1, offset:0}}>Karaoke</Col>
          </Row>
          <Row>
            <Button className='login-button' 
            variant="outline-light" 
            type="submit"

            href='https://democratic-carpool-karaoke.herokuapp.com/login' 
            // href='http://localhost:5000/login' 

            size="lg">
               Join The Party
            </Button>
          </Row>
        </div>
          <Row>
            <Col className='h6 login-photo-credit fixed-bottom text-center'>Made By <a href="https://github.com/DrCardamom/democratic-carpool-karaoke">Shimba</a>. Photo by <a href="https://unsplash.com/@anniespratt">Annie Spratt</a>. 2019</Col>
          </Row>
      </>
    )
  }
}

export default Login;
