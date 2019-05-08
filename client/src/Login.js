import React, { Component } from 'react';
import './Login.css';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class Login extends React.Component
{
  render()
  {
    return (
      <Container className="Login_container">
        <Row className="test">
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
          <Button className='login-button' variant="outline-light" type="submit" href='http://localhost:5000/login' size="lg">
             Join The Party
          </Button>
        </Row>
        <Row>
          <Col className='h6 login-photo-credit fixed-bottom' xs={{span:4, offset:4}}>Made By <a href="https://github.com/DrCardamom/familydrive-reactjs">Shimba</a>. Photo by <a href="https://unsplash.com/@anniespratt">Annie Spratt</a>. 2019</Col>
        </Row>
      </Container>
    )
  }
}

export default Login;
