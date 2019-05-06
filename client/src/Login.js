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
        <Row>
          <Col className='h1'>Family Drive</Col>
        </Row>
        <Row>
          <Col className='h5'>Carpool with family/friends from diffreent age groups? Not sure what music to put on?<br />
          This app can help you! It generates a playlist that consists of hit songs from the time when you are/were in your 20s.</Col>
        </Row>
        <Button variant="dark" type="submit" href='https://family-drive.herokuapp.com/login'>
           🚗 Get started 🚗
        </Button>
      </Container>
    )
  }
}

export default Login;
